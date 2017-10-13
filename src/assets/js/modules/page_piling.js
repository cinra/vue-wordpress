import $ from 'jquery';
//window.jQuery = $;
//import pagepiling from 'pagepiling.js';
import { $WINDOW, isMobile } from '../helpers';
import ViewBase from '../view_base';

const pagepiling = require('pagepiling.js');

console.log($);
export default class extends ViewBase {
  constructor(el) {
    super(el);
  }

  initialize() {
    super.initialize();
    this.bind();
  }

  bind() {
    console.log($('.js-piling'));
    this.$el.pagepiling();

    // $('body')
    //   .on('v-created', this.setup.bind(this));

    // $.scrollify({
    //   section: ".js-scrollify",
    //   scrollSpeed: 600
    // })

    // this.$el.each((i, target) => {
    //   new global.Waypoint({
    //     element: target,
    //     handler(direction) {
    //       if (direction === 'down') {
    //         this.element.classList.add('is-view');
    //         this.destroy();
    //       }
    //     },
    //     offset: '30%'
    //   })
    // })
  }

  setup() {
    this.$el.pagepiling();
  }
}