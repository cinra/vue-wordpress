<template>
  <div id="app">

    <!-- ローカル登録されたコンポーネントの使用 -->
    <part-header />

    <div class="l-container" ref="container">
      <main class="l-main">

        <part-gnav />

        <div class="l-content">

          <!-- このコンポーネントは、この要素の子に設定されたいくつかの条件が更新される度、
            該当の要素にトランジションクラスを付与します。
            主に、v-if（ディレクティブ）, v-show（ディレクティブ）, key（属性）等で発火します。
            https://jp.vuejs.org/v2/guide/transitions.html -->
          <transition name="component-fade" mode="out-in">

            <!-- 与えられたパスに対して、マッチしたコンポーネントを描画する関数型コンポーネント -->
            <router-view :key="$route.path"></router-view>

          </transition>
        </div>
      </main>
    </div>

    <part-footer />
  </div>

</template>

<script>
  // Components
  import partHeader from './views/partial/header.vue'
  import partFooter from './views/partial/footer.vue'
  import partGnav from './views/partial/gnav.vue'

  // Vuex
  import { store } from './store'

  export default {
    name: 'app',
    data: () => {
      return {
      }
    },
    // このコンポーネントのスコープ内でのみ利用可能なコンポーネントを作成
    components: {
      partHeader,
      partFooter,
      partGnav,
    },
    watch: {
    },
    created: function() {
    },
    beforeUpdate: function(){
    },
    methods: {
    }
  }
</script>
