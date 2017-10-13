import vue from 'Vue'
import vuex from 'Vuex'
import VueResource from 'vue-resource'

/**
 * Setting
 */
vue.use(vuex);
vue.use(VueResource)

/**
 * Interceptor
 * リクエスト前の処理を定義（DEMOでは、WPからnonceを渡していない為、省略）
 */
// vue.http.interceptors.push((request, next) => {
//   request.headers.set('X-WP-Nonce', window.WP_API_Settings.nonce);
//   next();
// });


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
  posts: ''
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
  fetchPosts(context, payload) {
    return new Promise((resolve, reject) => {
      const _to = payload.to || {};
      const req = {
        'public': () => {
          return new Promise(resolve => { vue.http.get('/wp-json/wp/v2/posts', { params: _to.query }, {}).then(response => { resolve(response) }) })
        },
      };

      (async () => {
        // 記事情報取得
        const resp = await req['public']();
        const data = {
          body: resp.body || {},
          headers: resp.headers || {}
        };

        return data;
      })().then(response => {
        const _body = response.body instanceof Array ? response.body : [response.body];
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
};

export const store = new vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
