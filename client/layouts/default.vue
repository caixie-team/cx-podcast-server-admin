<template>
  <div id="app" :class="classes" ref="layout" v-cloak>
    <keep-alive>
      <logged-in></logged-in>
    </keep-alive>
    <!--<logged-out />-->
    <div id="content" class="o-layout__content">
      <div id="primary" class="o-layout__primary">
        <nuxt/>
      </div>
      <div id="secondary" class="o-layout__secondary" v-if="!fullWideLayout">
        <div class="c-apps-navigation">
          <navigation/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LoggedIn from './masterbar/logged-in'
  import LoggedOut from './masterbar/logged-out'
  import Navigation from '~/components/navigation'

  export default {
    components: {
      LoggedIn,
      LoggedOut,
      Navigation
    },
    data () {
      return {
        isLogged: false
      }
    },
    computed: {
      fullWideLayout () {
        return this.$store.state.options.fullWideLayout
      },
      currentLayoutFocus () {
        return this.$store.state.options.layoutFocus
      },
      classes () {
        // const focus = this.$store.state.options.layoutFocus
        const classArray = [
          'notouch',
          'o-layout',
          'is-group-apps',
          'is-section-posts-pages',
          this.currentLayoutFocus === 'apps' ? 'focus-apps' : 'focus-sidebar',
          {'has-no-sidebar': this.fullWideLayout}
        ]
        return classArray
      }
    }
  }
</script>
