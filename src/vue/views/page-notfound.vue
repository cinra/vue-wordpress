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
  export default {
    name: 'page-notfound',
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
