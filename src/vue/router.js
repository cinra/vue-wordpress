import vue from 'Vue'
import VueRouter from 'vue-router'
import { store } from './store'


/**
 * Components
 *
 */
import Top from './views/top/ja.vue'
import Posts from './views/archive/posts.vue'
import Post from './views/single/post.vue'
import About from './views/page-about.vue'
import NotFound from './views/page-notfound.vue'


/**
 * Setting
 * vue-routerの呼び出しを行う
 */
vue.use(VueRouter)


/**
 * Routing
 *
 */
const router = new VueRouter({
  mode: 'history', // デフォルトは hash モード
  base: '/',
  scrollBehavior: (to, from, savedPosition) => { // スクロールの挙動をカスタマイズ https://router.vuejs.org/ja/advanced/scroll-behavior.html
    // 保持されたスクロールポジションが存在する場合、該当位置まで移動
    return !savedPosition ? { x: 0, y: 0 } : savedPosition;
  },
  routes: [
    /**
     * 以下のオブジェクトがルートレコード
     * https://router.vuejs.org/ja/api/route-object.html
     */

    // TOP
    { path: '/:preview?',
      component: Top },

    // PAGE
    { path: '/about',
      component: About },

    // POSTS (ARCHIVE)
    /**
     * 動的ルートマッチング
     * https://router.vuejs.org/ja/essentials/dynamic-matching.html
     */
    { path: '/news',
      component: Posts },

    // POST (DETAIL)
    { path: '/news/:slug?',
      component: Post },

    // 404 NOT FOUND
    { path: '*:preview?',
      component: NotFound }
  ]
});


/**
 * グローバルガード（ナビゲーションガード）
 * https://router.vuejs.org/ja/advanced/navigation-guards.html
 */
router.beforeEach((to, from, next) => {

  next();
});

router.afterEach((to, from, next) => {});

export default router;