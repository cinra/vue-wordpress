<template>
  <div class="l-contact">
    <h1 class="heading-primary">{{ textTitle[$store.state.formState] }}</h1>

    <form novalidate method="post" enctype="multipart/form-data" class="form" ref="form">
      <input type="hidden" name="_wpnonce" :value="nonce" />
      <input type="hidden" name="_wp_http_referer" value="/contact/" />
      <input type="hidden" name="_finished" value="1" />
      <input type="hidden" name="_finish_page" :value="`${ url_origin }/contact/complete`" />
      <input type="hidden" name="_type[]" value="send" />
      <input type="hidden" name="_type[]" value="confirm" />

      <fieldset class="form__field">
        <legend class="form__head">お問い合わせ内容</legend>

        <div class="form__content">
          <label class="form__item">
            <p>名前</p>
            <input type="text" name="post_name" :value="formData.post_name" placeholder="例）森羅 太郎" :readonly="$store.state.formState === 2">
          </label>

          <label class="form__item">
            <p>メール</p>
            <input type="text" name="post_email" :value="formData.post_email" placeholder="例）demo@cinra.net" :readonly="$store.state.formState === 2">
          </label>

          <label class="form__item">
            <p>件名</p>
            <input type="text" name="post_title" :value="formData.post_title" placeholder="件名" :readonly="$store.state.formState === 2">
          </label>

          <label class="form__item">
            <p>本文</p>
            <textarea name="post_message" :value="formData.post_message" placeholder="本文" :readonly="$store.state.formState === 2">{{ formData.post_message }}</textarea>
          </label>
        </div>
      </fieldset>

      <div class="form__submit" :class="{ 'is-confirm': $store.state.formState === 2 }">
        <button class="button-form--back" @click="backHandler" v-if="$store.state.formState === 2">修正</button>
        <button class="button-form--submit" @click="submitHandler">{{ textSubmit[$store.state.formState] }}</button>
      </div>
    </form>
  </div>
</template>

<script>
  // Vuex
  import { store } from '../../store'

  export default {
    name: 'contact',
    data: () => {
      return {
        textTitle: ['', 'CONTACT', 'CONTACT（確認）'],
        textSubmit: ['', '確認', '送信'],
        apiRoot: window.WP_API_Settings.root,
        nonce: window.WP_API_Settings.nonce_wpcf7,
        url_origin: location.origin,
        formData: {}
      }
    },
    head: {
      title: { inner: 'CONTACT | DEMO' },
      meta: function() {
        const _update = {
          'description': 'DEMO',
          'og:title': 'CONTACT | DEMO',
          'og:description': 'DEMO',
          'twitter:title': 'CONTACT | DEMO',
          'twitter:description': 'DEMO'
        };
        return this.$store.getters.getMeta(_update);
      }
    },
    watch: {
    },
    created: function() {
    },
    mounted: function() {
      if(this.$store.state.formState === 0) {
        this.update();
        this.$store.commit('saveFormState', 1);
      }
    },
    methods: {
      update() {
        this.$store.commit('saveFormData', this.$store.getters.form2json(this.$refs.form));
        this.formData = this.$store.state.formData;
      },
      onSubmit() {
        console.log('送信された値');
        console.log(this.$store.getters.form2json(this.$refs.form));
        /**
         * フォームをPOST
         */
        this.$http.post(`/wp-json/contact-form-7/v1/contact-forms`,
        this.$store.state.formData,
        {
          headers: {
            '_wpnonce': this.nonce
          }
        })
        .then(response => {
          console.log(response);

          this.$store.commit('saveFormState', 3);
          this.$router.push({ path: '/contact/complete' });
        })
      },
      backHandler() {
        this.$store.commit('saveFormState', this.$store.state.formState - 1);
      },
      submitHandler(e) {
        this.update();

        /**
         * Validationをかける場合はこのあたりに実装
         */
        // this.$validator.validateAll().then(result => {
        //   if (!result || this.bindValues.postEmail !== this.bindValues.postEmailCheck) {
        //     // validate error...
        //     e.preventDefault();
        //     this.hasError = true;
        //     this.$scrollTo(this.$refs.contactStatus, 700, { offset: -80 })
        //     return;
        //   }
        // })
        e.preventDefault();
        if(this.$store.state.formState < 2) {
          this.$store.commit('saveFormState', this.$store.state.formState + 1);
          return;
        }

        this.onSubmit();
      },
    }
  }
</script>
