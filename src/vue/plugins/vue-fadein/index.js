import directive from './directive'

const VueFadein = {
  install: function(Vue, options) {

    Vue.directive('fadein', directive);

    // コンポーネントを定義
    // Vue.component('', )
  }
}
export default VueFadein
