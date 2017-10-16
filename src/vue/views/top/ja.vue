<template>
  <div class="l-top">

    <section class="section">
      <h2 class="heading-primary">NEWS</h2>

      <ul class="panels" v-fadein>
        <li v-for="(item, i) in $store.state.posts" :key="item">
          <router-link :to="`/news/${item.slug}`">
            <div class="panels__image--blue">
              <post-img :source="item" :size="'medium'" />
            </div>
            <div class="panels__description">
              <p class="panels__text">{{ item.title ? item.title.rendered : ''}}</p>
              <ul class="panels__category">
                <li v-for="tag in item.categories">{{ tag.name }}</li>
              </ul>
              <p class="panels__date">{{ item.date != undefined ? $store.getters.getFormatDate(item.date, 'YYYY.MM.DD') : '' }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </section>

  </div>
</template>

<script>
  // Vuex
  import { store } from '../../store'

  // Components
  import Post from '../single/post.vue'

  export default {
    name: 'page-top',
    beforeRouteEnter(to, from, next) {
      /**
       * プレビューでリクエストがあった場合の処理
       */
      if(to.query['preview']) {
        const _postType = to.query['post_type'] || 'news'; // カスタム投稿タイプへの対応

        /**
         * postのidが正常にセットされている場合は、記事詳細コンポーネントに移す
         */
        if(to.query['preview_id'] || to.query['p']) {
          next({ path: `${ _postType }/${ to.query['preview_id'] || to.query['p'] }`, component: Post, query: to.query })
        } else {
          next();
        }
      } else {
        store.dispatch('fetchPosts', { to: to }).then(() => {
          next();
        })
      }
    },
    components: {
    },
    data: () => {
      return {
      }
    },
    head: {
      title: { inner: 'TOP | DEMO' },
      meta: function() {
        const _update = {
          'description': 'SAMPLE',
          'og:title': 'TOP | DEMO',
          'og:description': 'SAMPLE',
          'twitter:title': 'TOP | DEMO',
          'twitter:description': 'SAMPLE'
        };
        return this.$store.getters.getMeta(_update);
      }
    },
    watch: {
    },
    created: function() {
    },
    mounted: function() {
    },
    methods: {
    }
  }
</script>
