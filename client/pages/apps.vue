<template>
  <main data-reactroot="" class="notouch c-apps c-main" role="main">
    <h2 class="c-apps__select-heading">
      选择你要进入的应用
    </h2>
    <div class="c-card c-apps__selector-wrapper">
      <div class="c-app-selector c-apps-list is-hover-enabled">
        <div class="is-open has-open-icon c-search">
          <div class="c-spinner" style="">
            <svg class="c-spinner__image" width="20" height="20" viewBox="0 0 100 100">
              <defs>
                <mask id="maskBorder36">
                  <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
                  <circle r="46%" cx="50%" cy="50%" fill="black"></circle>
                </mask>
                <mask id="maskDonut36">
                  <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                  <circle r="46%" cx="50%" cy="50%" fill="white"></circle>
                  <circle r="30%" cx="50%" cy="50%" fill="black"></circle>
                </mask>
                <mask id="maskLeft36">
                  <rect x="0" y="0" width="50%" height="100%" fill="white"></rect>
                </mask>
                <mask id="maskRight36">
                  <rect x="50%" y="0" width="50%" height="100%" fill="white"></rect>
                </mask>
              </defs>
              <circle class="c-spinner__border" r="50%" cx="50%" cy="50%" mask="url( #maskBorder36 )"></circle>
              <g mask="url( #maskDonut36 )">
                <g mask="url( #maskLeft36 )">
                  <rect class="c-spinner__progress is-left" x="0" y="0" width="50%" height="100%"></rect>
                </g>
                <g mask="url( #maskRight36 )">
                  <rect class="c-spinner__progress is-right" x="50%" y="0" width="50%" height="100%"></rect>
                </g>
              </g>
            </svg>
          </div>
          <div class="c-search__icon-navigation">
            <svg class="gridicon gridicons-search c-search__open-icon" height="24" width="24"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                <path
                  d="M21 19l-5.154-5.154C16.574 12.742 17 11.42 17 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.42 0 2.742-.426 3.846-1.154L19 21l2-2zM5 10c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"></path>
              </g>
            </svg>
          </div>
          <div class="c-search__input-fade">
            <input type="search" class="c-search__input"
                   placeholder="搜索…"
                   autocapitalize="none">
          </div>
        </div>
        <div class="c-app-selector__sites">
          <div class="c-app" v-for="app in org.apps">
            <a class="c-app__content" @click="selectApp($event, app)">
              <div class="c-app-icon is-blank" style="height: 32px; width: 32px; line-height: 32px; font-size: 32px;">
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
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    // middleware: 'authenticated',
    // layout: 'apps',
//    async fetch ({store}) {
//      await store.dispatch('loadOrgApps')
//    },
    computed: {
      org () {
        return this.$store.state.org.detail.data
      }
    },
    mounted () {},
    methods: {
      handleClick () {
      },
      selectApp (event, app) {
        this.$store.commit('org/SET_CURRENT_APP', app)
        this.$router.push(`/${app.type}`)
      }
    }
  }
</script>
