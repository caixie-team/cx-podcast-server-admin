<template>
  <div id="app" class="o-layout is-section-login focus-content has-no-sidebar " ref="layout" v-cloak>
    <!--<logged-in></logged-in>-->
    <logged-out />
    <keep-alive>
      <div id="content" class="o-layout__content">
        <div id="primary" class="o-layout__primary">
          <nuxt></nuxt>
        </div>
      </div>
    </keep-alive>
  </div>
</template>

<script>
  import LoggedIn from './masterbar/logged-in'
  import LoggedOut from './masterbar/logged-out'

  export default {
    components: {
      LoggedIn,
      LoggedOut
    },
    computed: {
      loginLayout () {
      }
    }
  }
</script>
