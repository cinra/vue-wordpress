<template>
  <nav class="gnav" ref="gnav">
    <ul>
      <li v-for="route in navItems[$store.state.language]"
          v-bind:key="route"
        >
        <router-link :to="route.to">{{route.name}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  import Velocity from 'velocity-animate'
  import { store } from '../../store'

  export default {
    name: 'gnav',
    data: () => {
      return {
        languageItems: {
          'ja': {
            to: '/en',
            name: 'ENGLISH'
          },
          'en': {
            to: '/',
            name: 'JAPANESE'
          }
        },
        navItems: {
          'ja': [{
              'to': '/about',
              'name': 'ABOUT'
            }, {
              'to': '/news',
              'name': 'NEWS'
            }, {
              'to': '/contact',
              'name': 'CONTACT'
            }]
          ,
          'en': [{
              'to': 'mailto:contact@cinra.net',
              'name': 'CONTACT'
          }]
        }
      }
    },
    beforeUpdate: function() {
    },
    watch: {
    },
    created: function() {
    },
    mounted: function() {
    },
    computed: {
    },
    methods: {
    }
  }
</script>
