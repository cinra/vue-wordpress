<template>
  <article class="l-post">
    <router-link to="/news" class="heading-primary"><span>NEWS</span></router-link>

    <section class="l-post__section">
      <div class="l-post__info" v-fadein>
        <div class="l-post__info__main">
          <h1 class="l-post__info__title" v-html="$store.state.posts[0].title.rendered"></h1>
        </div>
        <div class="l-post__info__sub">
          <div class="l-post__info__date">
            <p class="l-post__head">DATE</p>
            <p>{{ $store.getters.getFormatDate($store.state.posts[0].date, "DD MMM YYYY") }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="l-post__section">
      <div class="l-post__mainvisual" v-if="false">
        <post-img :source="'posts'" />
      </div>

      <div class="l-post__content">
        <div class="wysiwyg" v-html="$store.state.posts[0].content.rendered"></div>
      </div>
    </section>
  </article>
</template>


<script>
  // Vuex
  import { store } from '../../store'

  export default {
    name: 'single-post',
    beforeRouteEnter(to, from, next) {
      console.log(to);

      store.dispatch('fetchPosts', { to: to }).then(()=>{
        next();
      })
    },
    beforeRouteUpdate(to, from, next) {
      console.log(to);

      store.dispatch('fetchPosts', { to: to }).then(()=>{ next() })
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
    components: {
    },
    data: () => {
      return {
      }
    },
    created: function() {
    },
    computed: {

    },
    methods: {
    }
  }
</script>
