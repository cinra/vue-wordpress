import vue from 'Vue'
import vuex from 'Vuex'
import VueResource from 'vue-resource'

const WP = window.WP_API_Settings || {};

/**
 * Setting
 */
vue.use(vuex)
vue.use(VueResource)

/**
 * HTTP Interceptor
 * リクエスト前の処理を定義
 */
vue.http.interceptors.push((request, next) => {
  request.headers.set('X-WP-Nonce', WP.nonce || '');
  next();
});


/**
 * Vuex
 */
const state = {
  language: 'ja',
  head: {
    title: "DEMO",
    meta: {
      "description": "SAMPLE",
      "og:description": "SAMPLE",
      "og:title": "DEMO",
      "og:type": "article",
      "og:image": `${ location.origin }/assets/themes/v4_spa/img/og.png`,
      "og:site_name": "DEMO",
      "og:url": `${ location.origin }/`,
      "fb:app_id": "",
      "twitter:title": "DEMO",
      "twitter:description": "SAMPLE",
      "twitter:url": `${ location.origin }/`,
      "twitter:card": "summary_large_image",
      "twitter:image": `${ location.origin }/assets/themes/v4_spa/img/og.png`
    }
  },
  posts: '',
  fetchData: ''
};

const getters = {
  scrollTop: state => state.scrollTop,
  getMeta: state => (updateMetaObj) => {
    const _defaultSet = Object.assign({}, state.head.meta);
    const _updated = Object.assign(_defaultSet, updateMetaObj);
    let _result = [];

    Object.keys(_updated).forEach((k) => {
      var _item = {};
      if(k.match(/^og:/) || k.match(/^fb:/)) {
        _item['property'] = k;
      } else {
        _item['name'] = k;
      }
      _item['content'] = _updated[k];
      _item['id'] = k.replace(':', '-');

      _result.push(_item);
    });

    return _result;
  },
  getFormatDate: state => (date, format) => {
    const _tmp = typeof date === 'string' ? date : String(_tmp);
    const _date = new Date(_tmp);


    if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
    format = format.replace(/YYYY/g, _date.getFullYear());
    format = format.replace(/MMM/g, (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][_date.getMonth()]));
    format = format.replace(/MM/g, ('0' + (_date.getMonth() + 1)).slice(-2));
    format = format.replace(/DD/g, ('0' + _date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + _date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + _date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + _date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
      var milliSeconds = ('00' + _date.getMilliseconds()).slice(-3);
      var length = format.match(/S/g).length;
      for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
  }
};

const actions = {
  fetch(context, payload) {
    return new Promise((resolve, reject) => {
      const _to = payload.to || {};
      const _query = payload.query || _to.query;

      (async () => {
        return await vue.http.get(`${ WP.root }wp/v2${ payload.endpoint }`, { params: _query }, {})
      })().then(response => {
        const _body = response.body instanceof Array ? response.body : [response.body];
        context.commit('saveFetchData', _body);

        resolve(response.body);
      }, response => {

        reject();
      })
    })
  },
  fetchPosts(context, payload) {
    return new Promise((resolve, reject) => {
      const _to = payload.to || {};
      const _d = {};

      console.log(_to);

      /**
       * パラメータに「preview=true」が存在している場合は、投稿IDで取得処理を行う事で公開前のプレビューに対応
       */
      if(_to.query['preview']) {
        const _id = String(_to.query['preview_id'] || _to.query['p']).match(/^[0-9]+$/);
        _d.post_id = _id instanceof Array ? _id[0] : '';
      } else {
        if(_to.params['slug']) {
          _to.query['slug'] = _to.params['slug'];
        }
      }

      _d.query = _to.query;

      /**
       * リクエスト処理
       */
      const req = {
        'posts': (opt = {}) => {
          const d = {
            q: opt['query'] || '',
            post_id: opt['post_id'] || '',
          };
          return new Promise(resolve => { vue.http.get(`${ WP.root }wp/v2/posts/${ d.post_id }`, { params: d.q }, {}).then(response => { resolve(response) }) })
        },
      };

      /**
       * 記事データ取得
       */
      (async () => {
        const resp = await req['posts'](_d);
        const data = {
          body: resp.body || {},
          headers: resp.headers || {}
        };

        return data;
      })().then(response => {
        const _body = response.body instanceof Array ? response.body : [response.body];

        console.log('vuex: body');
        console.log(_body);

        context.commit('savePosts', _body);
        resolve(_body);

      }, response => {

        reject(response);
      })
    })
  },
};

const mutations = {
  savePosts(state, data) {
    state.posts = data;
  },
  saveFetchData(state, data) {
    state.fetchData = data;
  },
};

export const store = new vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
