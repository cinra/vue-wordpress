<template>
  <div class="l-posts">
    <h1 :class="isSort ? 'heading-primary--confine' : 'heading-primary'"><span>NEWS</span></h1>

    <div class="l-posts__content">
      <div class="heading-sub" v-fadein v-if="isSort">
        <p>{{ $store.state.posts[0].categories[0].acf.en_label }}</p>
        <div class="small" v-html="$store.state.posts[0].categories[0].description"></div>
      </div>
    </div>

    <section class="l-posts__section">
      <ul class="panels">
        <li v-for="(item, i) in $store.state.posts" v-fadein v-if="item">
          <router-link :to="item.slug != null ? `/news/${item.slug}` : '/news/'">
            <div class="panels__image--blue">
              <post-img :source="item" :size="'medium'" :class="{ 'is-loaded': loadedImage }" />
            </div>
            <div class="panels__description">
              <p class="panels__text">{{ (item.title != undefined && item.title.rendered != undefined)? item.title.rendered : '' }}</p>
              <ul class="panels__category">
                <li v-for="tag in item.categories">{{ tag.name }}</li>
              </ul>
              <p class="panels__date" v-if="item.date != undefined">{{ $store.getters.getFormatDate(item.date, 'YYYY.MM.DD') }}</p>
            </div>
          </router-link>
        </li>
      </ul>

      <part-pager :endPoint="'news'" :pages="pages" :addparams="addparams"/>

    </section>
  </div>

</template>

<script>
  // Vuex
  import { store } from '../../store'

  export default {
    name: 'archive-posts',
    beforeRouteEnter(to, from, next) {
      store.dispatch('fetchPosts', { to: to, requests: ['categories'] }).then(()=>{ next() })
    },
    beforeRouteUpdate(to, from, next){
      store.dispatch('fetchPosts', { to: to }).then(()=>{ next() })
    },
    beforeUpdate: function(){
      // すでにあるpagesの調整
      var _arr = this.createPages();

      for(var i = 0; i < this.pages.length; i += 1){
        this.pages[i] = _arr[i];
      }

      this.createParams();
      this.loadedImage = false;

      if(this.$route.query.categories) {
        this.isSort = true;
      }
    },
    components: {
    },
    data: () => {
      return {
        isSort: false,
        pages: [],
        addparams: "",
        loadedImage: false
      }
    },
    head: {
      title: function() {
        return {
          inner: this.$route.query.categories ? `「${ this.$store.state.posts[0].categories[0].acf.en_label }」のニュース - NEWS | CINRA, Inc.` : 'NEWS | ニュース - CINRA, Inc.'
        }
      },
      meta: function() {
        const _update = {
          'description': 'メディア掲載、アワード受賞、コーポレートニュース、イベント情報などのCINRAのニュースをご紹介します。',
          'og:title': this.$route.query.categories ? `「${ this.$store.state.posts[0].categories[0].acf.en_label }」のニュース - NEWS | CINRA, Inc.` : 'NEWS | ニュース - CINRA, Inc.',
          'og:description': 'メディア掲載、アワード受賞、コーポレートニュース、イベント情報などのCINRAのニュースをご紹介します。',
          'twitter:title': this.$route.query.categories ? `「${ this.$store.state.posts[0].categories[0].acf.en_label }」のニュース - NEWS | CINRA, Inc.` : 'NEWS | ニュース - CINRA, Inc.',
          'twitter:description': 'メディア掲載、アワード受賞、コーポレートニュース、イベント情報などのCINRAのニュースをご紹介します。'
        };
        return this.$store.getters.getMeta(_update);
      }
    },
    created: function() {
      if(this.$route.query.categories) {
        this.isSort = true;
      }

      var _arr = this.createPages();
      for(var i = 0; i < _arr.length; i += 1){
        this.pages[i] = _arr[i];
      }

      this.createParams();

    },
    methods: {
      onLoadProgress: function(instance, image) {
        //v-images-loaded:on.progress="onLoadProgress"
        this.loadedImage = image.isLoaded;
      },
      createParams: function(){
        var _rtstr = '';
        for(var item in this.$route.query){
          if(item != "per_page" && item != "page" && this.$route.query[item] && typeof this.$route.query[item] !== 'object') _rtstr +=  ("&" + item + "=" + this.$route.query[item] );
        }
        this.addparams = _rtstr;
      },
      createPages() {
        var _dummyarray = [];
        var _current = this.getPageCurrent();
        var _total = this.getPageTotal();
        var _tmp = [-2, -1, 0, 1, 2];
        if(_total <= _tmp.length){
          for(var i = 1; i <= _total; i += 1){
            _dummyarray.push(i);
          }
        }else{
          if(_total < _current + 2){
            var _add = (_current + 2) - _total;
            for(var j = 0; j < _tmp.length; j += 1){
              _tmp[j] -= _add;
            }
          }

          if(_current - 2 < 1){
            var _add =  (_current - 3) * -1;
            for(var j = 0; j < _tmp.length; j += 1){
              _tmp[j] += _add;
            }
          }

          for(var k of _tmp) {
            let _num = (_current + k);
            _dummyarray.push(`${_num}`);
          }
        }

        return _dummyarray;
      },

      getPageTotal() {
        return this.$store.state.pageTotal;
      },

      getPageCurrent() {
        return this.$store.state.pageCurrent;
      },
    }
  }
</script>
