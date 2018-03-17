<template>
  <div class="o-layout focus-content has-no-sidebar" ref="layout">
    <logged-in v-if="!isLogged"/>
    <div class="layout__loader is-active">
      <!--<pulsing-dot :active="true"></pulsing-dot>-->
      <!--<div class="pulsing-dot"></div>-->
    </div>
    <div id="content" class="layout__content">
      <div id="primary" class="layout__primary">
        <nuxt/>
      </div>
    </div>

  </div>
</template>
<script>
//  import PulsingDot from '~/components/pulsing-dot'
  import LoggedIn from './masterbar/logged-in'
  import LoggedOut from './masterbar/logged-out'

  export default {
    middleware: 'auth',
    data () {
      return {
        isLogged: false
      }
    },
    mounted() {},
    components: {
//      PulsingDot,
      LoggedIn,
      LoggedOut
    },
    computed: {
      org () {
        return this.$store.state.org.detail.data
      }
    }
  }
</script>
