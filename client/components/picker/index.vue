<template>
  <div v-vue-esc="closePicker" v-click-outside="closePicker">
    <div class="c-app-selector c-apps-list is-hover-enabled">
      <div class="c-app-selector__apps">
        <div class="c-all-apps">
          <a class="c-app__content" @click="toAppHome">
            <span class="c-count">{{ org.apps.length }}</span>
            <div class="c-app__info">
              <span class="c-app__title">
                所有应用
              </span>
              <div class="c-all-apps-icon" :class="`has-${org.apps.length}-icons`">
                <div class="c-app-icon is-blank"
                     style="height: 14px; width: 14px; line-height: 14px; font-size: 14px;"
                     v-for="app in org.apps">
                  <img :src="app.logo_url" v-if="app.logo_url">
                  <svg class="gridicon gridicons-globe" height="11" width="11"
                       xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 24 24" v-else>
                    <g>
                      <path
                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div class="c-app" v-for="app in org.apps">
          <a class="c-app__content" @click.prevent="switchApp(app)">
            <div class="c-app-icon is-blank"
                 style="height: 32px; width: 32px; line-height: 32px; font-size: 32px;">
              <img :src="app.logo_url" v-if="app.logo_url">
              <svg class="gridicon gridicons-globe" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24" v-else>
                <g>
                  <path
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                </g>
              </svg>
            </div>
            <div class="c-app__info">
              <div class="c-app__title">
                {{ app.name}} - {{ app.type }}
              </div>
              <div class="c-app__domain">
                {{ app.description }}
              </div>
            </div>
          </a>
        </div>
      </div>
      <span class="c-app-selector__add-new-app">
        <a href="/start?ref=calypso-selector"
           class="c-button is-borderless"><svg
          class="gridicon gridicons-add-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"><g><path
          d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"></path></g></svg>
                创建新应用
              </a>
      </span>
    </div>
  </div>
</template>

<script>
  import clickOutside from '~/directives/click-outside'
  import vueEsc from '~/directives/vue-esc'

  export default {
    directives: {
      clickOutside,
      vueEsc
    },
    computed: {
      org () {
        return this.$store.state.org.detail.data
      },
      currentLayoutFocus () {
        return this.$store.state.options.layoutFocus
      },
    },
    methods: {
      async switchApp (app) {
        await this.$store.commit('org/SET_CURRENT_APP', app)
        this.closePicker()
        this.$router.push('/')
      },
      toAppHome (event) {
        event.preventDefault();
        event.stopPropagation();
        this.$router.push('/apps')
        this.closePicker()
      },
      scrollToTop: function () {
        document.getElementById('secondary').scrollTop = 0
        window.scrollTo(0, 0)
      },
      closePicker: function () {
        if (this.currentLayoutFocus === 'focus-apps') {
          this.$store.commit('options/SET_LAYOUT_FOCUS', 'sidebar')
          this.scrollToTop()
        }
      }
    }
  }
</script>
