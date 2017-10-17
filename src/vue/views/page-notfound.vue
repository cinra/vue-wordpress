<template>
  <div class="l-notfound">
    <h1>NOT FOUND</h1>

    <section class="section">
      <h2>お探しのページが見つかりません</h2>

      <router-link to="/" exact>BACK TO HOME</router-link>
    </section>
  </div>
</template>

<script>
  // Vuex
  import { store } from '../store'

  // Components
  import Post from './single/post.vue'

  export default {
    name: 'page-notfound',
    beforeRouteEnter(from, to, next) {
      /**
       * プレビューでリクエストがあった場合の処理
       */
      if(from.query['preview']) {
        const _postType = from.query['post_type'] || 'news'; // カスタム投稿タイプへの対応

        /**
         * postのidが正常にセットされている場合は、記事詳細コンポーネントに移す
         */
        if(from.query['preview_id'] || from.query['p']) {
          next({ path: `${ _postType }/${ from.query['preview_id'] || from.query['p'] }`, component: Post, query: from.query })
        } else {
          next();
        }
      } else {
        next();
      }
    },
    data: () => {
      return {
      }
    },
    head: {
      title: { inner: 'NOT FOUND - DEMO' },
      meta: function() {
        const _update = {
          'description': 'お探しのページは見つかりませんでした。',
          'og:title': 'NOT FOUND - DEMO',
          'og:description': 'お探しのページは見つかりませんでした。',
          'twitter:title': 'NOT FOUND - DEMO',
          'twitter:description': 'お探しのページは見つかりませんでした。'
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
