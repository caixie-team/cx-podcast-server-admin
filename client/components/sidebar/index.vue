<template>
  <div class="c-apps-navigation">

    <ul class="c-sidebar has-regions">
      <div class="c-sidebar__region">
        <div class="c-card c-current-app">
        <span class="c-current-app__switch-apps"  @click="switchApps">
          <button type="c-button" class="c-button is-borderless">
            <svg
              class="gridicon gridicons-chevron-left" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"><g><path
              d="M14 20l-8-8 8-8 1.414 1.414L8.828 12l6.586 6.586"></path></g></svg>
            <span class="current-app__switch-apps-label">
              切换应用
            </span>
          </button>
        </span>
          <div class="c-app">
            <a class="c-app__content"
               title="">
              <div class="c-app-icon " style="">
                <img class="c-app-icon__img image" :src="curApp.logo_url" v-if="curApp.logo_url">
                <svg class="gridicon gridicons-globe" height="11" width="11"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24" v-else>
                  <g>
                    <path
                      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
                  </g>
                </svg>
              </div>
              <div class="c-app__info">
                <div class="c-app__title">{{curApp.name}}</div>
                <div class="c-app__domain">{{curApp.type}}</div>
              </div>
            </a>
            <div class="c-app-indicator__wrapper"></div>
          </div>
        </div>
        <div>
          <li class="c-sidebar__menu" v-for="menu in menus" :key="menu.id">
            <h2 class="c-sidebar__heading" v-if="menu.title">{{menu.title}}</h2>
            <ul>
              <nuxt-link :to="menuItem.link"
                         tag="li"
                         v-if="menu.items"
                         v-for="menuItem in menu.items"
                         :key="menuItem.id">

                <a>
                  <span class="c-menu-link-text">{{menuItem.name}}</span>
                </a>
                <nuxt-link :to="menuItem.action"
                           class="c-sidebar__button" v-if="menuItem.action">添加</nuxt-link>

              </nuxt-link>
            </ul>
          </li>
        </div>
      </div>
      <div class="c-sidebar__footer">

<!--        <button class="c-button inline-help is-borderless" title="帮助" type="button">
          <svg class="gridicon gridicons-help-outline" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 24 24">
            <g>
              <path
                d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4 8c0-2.21-1.79-4-4-4s-4 1.79-4 4h2c0-1.103.897-2 2-2s2 .897 2 2-.897 2-2 2c-.552 0-1 .448-1 1v2h2v-1.14c1.722-.447 3-1.998 3-3.86zm-3 6h-2v2h2v-2z"></path>
            </g>
          </svg>
        </button>-->

      </div>
    </ul>


  </div>
</template>
<script>
  import ConfirmButton from '~/components/confirm-button'

  export default {
    name: 'Sidebar',
    components: {
      ConfirmButton
    },
    data () {
      return {
        menus: [
          // {
          // items: [{
          //   name: '设置 & 人员',
          //   link: 'app'
          // }, {
          //   name: '统计',
          //   link: 'stats'
          // }]
          // },
          {
            id: '1',
            'title': '管理',
            items: [
              {
                id: '1',
                name: '内容',
                to: {name: 'posts'},
                link: '/posts',
                action: '/post'
              }
              // {
              //   id: '2',
              //   name: '媒体',
              //   link: '/media'
              // },
              // {
              //   id: '3',
              //   name: '评论',
              //   link: 'comments'
              // }
              // {name: '成员'},
              // {name: '用户'}
            ]
          }, {
            id: '2',
            'title': '配置',
            items: [
              {
                id: '1',
                name: '人员',
                link: '/people/team',
                // to: {name: 'people/team', params: {type: 'team'}},
                action: '/people/new'
              },
              {
                id: '2',
                name: '设置',
                to: {name: 'settings'},
                link: '/settings/general'
              }
            ]
          }
        ],
        isLogged: false
      }
    },
    computed: {
      curApp () {
        return this.$store.state.org.currentApp
      }
    },
    methods: {
      switchApps (event) {
        event.preventDefault();
        event.stopPropagation();
        // this.$store.dispatch('loadOrgApps')
        this.$store.commit('options/SET_LAYOUT_FOCUS', 'apps')
//        this.props.setLayoutFocus( 'sites' );
      }
    }
  }
</script>
