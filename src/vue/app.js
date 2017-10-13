import vue from 'Vue'
import VueResource from 'vue-resource'
import App from './app.vue'
import { store } from './store'
import router from './router'


/**
 * Plugins
 * Vue.jsプラグインをnpmでインストール後、読み込み
 */
import VueScrollTo from 'vue-scrollto'
import VueHead from 'vue-head'
import VueFadein from './plugins/vue-fadein'


/**
 * Setting
 * Vue.js自体の設定、プラグインの呼び出しを行う
 */
//sync(store, router)
vue.use(VueResource)
vue.config.devtools = false
vue.http.options.credentials = true
vue.use(VueScrollTo, {
  container: 'body',
  duration: 700,
  easing: 'ease-out',
  offset: 0,
  cancelable: true,
  onDone: false,
  onCancel: false
})
vue.use(VueHead, {
  separator: ''
})
vue.use(VueFadein)


/**
 * App Entry（エントリポイント）
 * vue-routerの初期化、vuexのstoreをセット
 */
const app = new vue({
  data: () => {
    return {
    }
  },
  methods: {
  },
  store,
  router,
  render: h => h(App)
}).$mount('#app');
