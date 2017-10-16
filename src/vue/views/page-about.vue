<template>
  <div class="l-about">
    <h1 class="heading-primary">{{ title }}</h1>

    <div class="wysiwyg" v-html="content"></div>
  </div>
</template>

<script>
  // Vuex
  import { store } from '../store'

  export default {
    name: 'page-about',
    beforeRouteEnter(to, from, next) {
      store.dispatch('fetch', { to: to, endpoint: '/pages', query: { slug: 'sample-page' } }).then(()=>{
        next();
      });
    },
    data: () => {
      return {
        title: '',
        content: ''
      }
    },
    head: {
      title: { inner: 'ABOUT | DEMO' },
      meta: function() {
        const _update = {
          'description': 'SAMPLE',
          'og:title': 'ABOUT | DEMO',
          'og:description': 'SAMPLE',
          'twitter:title': 'ABOUT | DEMO',
          'twitter:description': 'SAMPLE'
        };
        return this.$store.getters.getMeta(_update);
      }
    },
    created: function() {
      if(this.$store.state.fetchData[0]) {
        this.title = this.$store.state.fetchData[0].title.rendered;
        this.content = this.$store.state.fetchData[0].content.rendered;
      }
      console.log(store.state.fetchData);
    },
    methods: {
    }
  }
</script>
