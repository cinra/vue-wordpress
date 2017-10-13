import $ from 'jquery';
//global.jQuery = $;

import { $WINDOW, isWindows } from './helpers';
import { _debounce } from 'lodash.debounce';

// modules
//import PagePiling from './modules/page_piling';
//import Accordion from './modules/effect';
//import Scroll from './modules/message';
//import PracticePixi from './modules/practice-pixi';


export default class Project {

  constructor(el) {
    this.$el = $(el);
    this.body = document.body;

    this.modules = {
      //pagePiling: new PagePiling('.js-piling')
    };

    this.initialize();
    this.bind();
  }

  initialize() {

    //this.body.classList.add('is-loaded');
  }

  bind() {
    // $WINDOW
    //   .on('load', this.onLoad.bind(this));
  }

  onLoad() {
    //console.log(new Date());
  }
}