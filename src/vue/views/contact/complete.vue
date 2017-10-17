<template>
  <div class="l-contact">
    <h1 class="heading-primary"><span>COMPLETE</span></h1>

    <section class="section">
      <p>お問い合わせありがとうございました。<br>
        後日、担当者からご返事差し上げます。<br>
        尚、内容によってはご返事を控えさせて頂く場合もございます。ご了承ください。</p>

      <router-link to="/" exact class="">BACK TO HOME</router-link>
    </section>

  </div>
</template>

<script>
  // Vuex
  import { store } from '../../store'

  export default {
    name: 'confirm',
    beforeRouteEnter(to, from, next) {
      if(store.state.formState !== 3) {
        next({ path: '/' })
      } else {
        store.commit('saveFormState', 0);
        next();
      }
    },
    head: {
      title: { inner: 'COMPLETE | 問い合わせ完了 - DEMO' },
      meta: function() {
        const _update = {
          'description': "お問い合わせありがとうございました。" ,
          'og:title': 'COMPLETE | 問い合わせ完了 - DEMO' ,
          'og:description': 'お問い合わせありがとうございました。',
          'twitter:title': 'COMPLETE | 問い合わせ完了 - DEMO',
          'twitter:description': 'お問い合わせありがとうございました。'
        };
        return this.$store.getters.getMeta(_update);
      }
    },
  }
</script>