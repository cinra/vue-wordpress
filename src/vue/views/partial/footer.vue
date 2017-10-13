<template>
  <footer class="l-footer">
    <a href="#" class="pagetop" v-scroll-to="'body'"></a>
    <div class="l-footer__inner">

      <div class="l-footer__links">
        <ul class="l-footer__links__list">
          <li v-for="route in linkList[$store.state.language]">
            <router-link :to="route.to" v-if="!route.to.match(/mailto/)">{{route.name}}</router-link>
            <a :href="route.to" v-else>{{route.name}}</a>
          </li>
        </ul>
      </div>

      <p class="l-footer__copy">Copyright CINRA. inc, All Rights Reserved</p>
    </div>
  </footer>
</template>

<script>
  // Vuex
  import { store } from '../../store'


  export default {
    name: 'footer',
    data: () => {
      return {
        linkList: {
          'ja': [{
              'to': '/about',
              'name': 'ABOUT'
            }, {
              'to': '/news',
              'name': 'NEWS'
            }]
          ,
          'en': [{
              'to': 'mailto:contact@cinra.net',
              'name': 'CONTACT'
          }]
        }
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>