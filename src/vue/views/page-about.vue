<template>
  <div class="l-about">
    <h1 class="heading-primary">ABOUT</h1>

    <p>固定ページ</p>
  </div>
</template>

<script>
  // Vuex
  import { store } from '../store'

  export default {
    name: 'page-about',
    beforeRouteEnter(to, from, next) {
      store.dispatch('fetch', { to: to, endpoint: '/pages', query: {slug: 'about'}, isMeta: true }).then(()=>{
        next();
      });
    },
    data: () => {
      return {
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
    },
    methods: {
    }
  }
</script>
