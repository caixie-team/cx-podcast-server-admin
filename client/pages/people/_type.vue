<template>
  <div>
    <div class="c-card c-people-list-section-header c-section-header is-compact">
      <div class="c-section-header__label">
        <span class="c-section-header__label-text">人数</span><span
        class="count">{{ users.count }}</span>
      </div>

      <div class="c-section-header__actions">
            <span class="c-button-group">
            <nuxt-link to="/people/new"
                       class="c-button c-people-list-section-header__add-button is-compact">
              <svgicon name="gridicons-user-add"  class="gridicon gridicons-user-add" style="height: 18px; width: 18px;"/>
              添加
              <!--<svgicon name="gridicons-user" style="height: 18px; width: 18px;"/>-->
            </nuxt-link>
          </span>
      </div>
    </div>
    <div class="c-card">
      <!--<c-scroll :handler="fetchData" :shoud-handle="!loading">-->
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="fetching"
        infinite-scroll-distance="20">
        <div class="c-people-selector__infinite-list">
          <nuxt-link
            type="user"
            class="c-card c-people-list-item is-compact is-card-link"
            :to="'/people/edit/' + profile.id" v-for="profile in users.data" :key="profile.id">
            <svg class="gridicon gridicons-chevron-right c-card__link-indicator" height="24" width="24"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path>
              </g>
            </svg>
            <div class="c-people-list-item__profile-container">
              <div class="c-people-profile">
                <div class="c-people-profile__gravatar">
                  <img class="gravatar"
                       :src="profile.avatarUrl"
                       width="72" height="72" v-if="profile.avatarUrl">
                  <svgicon
                    name="gridicons-user-circle"
                    color="#fafafa #e0e6e8"
                    style="width: 72px; height: 72px;" v-else/>
                </div>
                <div class="c-people-profile__detail">
                  <div class="c-people-profile__username">{{ profile.user_nicename }}</div>
                  <div class="c-people-profile__login">
                    <span>{{getAddress(profile)}}</span>
                  </div>
                  <div class="c-people-profile__subscribed">{{$moment(profile.user_registered).locale('zh-ch').format('LL')}}</div>

                  <div class="c-people-profile__badges">
                    <!--<div class="c-people-profile__role-badge" :class="profile.type === 'wechat' ? 'type-wechat' : ''">-->
                      <!--<span>{{ getType(profile) }}</span>-->
                    <!--</div>-->
                    <div class="c-people-profile__role-badge c-role-administrator">
                      <span>{{ getRole(profile) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>

    </div>
    <div class="c-scroll-loader u-flex u-mt-large u-align-items-center u-justify-center u-text-mute"
         :style="fetching ? 'padding-bottom: 20px;' : 'padding-bottom: 0px;' ">
      <div :class="{'c-scroll-loader-wrapper': true, 'c-scroll-loader-wrapper--active' : fetching }"
           style="flex-direction: column;">
        <spinner class="u-mb-small"/>
        <span v-if="remaining > 0">还有 {{users.count - users.data.length}} 条内容</span>
      </div>
    </div>
    <div class="c-list-end" v-if="remaining === 0">
      <svgicon name="gridicons-status" class="gridicon"></svgicon>
    </div>
    <back-top/>
  </div>
</template>

<script>
  // import CScroll from '~/components/scroll'
  import Spinner from '~/components/spinner'
  // import InfiniteLoading from 'vue-infinite-loading/src/components/InfiniteLoading.vue';
  import BackTop from '~/components/back-top'

  import '~/icons/gridicons-status'
  import '~/icons/gridicons-user-circle'
  import '~/icons/gridicons-user'
  import '~/icons/gridicons-plus-small'
  import '~/icons/gridicons-user-add'
  export default {
    validate ({params}) {
      this.curType = params.type
      // Must be a number
      return /^\w+$/.test(params.type)
    },
    async fetch ({store, params}) {
      if (!params.type) {
        params.type = 'team'
      }
      await store.dispatch('loadUsers', {type: params.type})
    },
    components: {
      // CScroll,
      // InfiniteLoading,
      Spinner,
      BackTop
    },
    data () {
      return {
        curType: 'team',
        loading: false,
        page: 1,
        busy: false,
        list: []
      }
    },
    mounted () {
      this.page = this.users.currentPage
    },
    methods: {
      infiniteHandler ($state) {
        // this.page++
        // setTimeout(() => {
        // if (this.page > this.users.totalPages) {
        //   this.page = this.users.totalPages
        //   $state.complete()
        // }
        // this.$store.dispatch('loadUsers', {type: 'wechat', page: this.page})
        // if (!this.fetching) {
        //   $state.loaded();
        // }

        // }, 1000);
      },
      async loadMore () {
        this.busy = true;
        this.page++
        // console.log(this.page++)
        if (this.page > this.users.totalPages) {
          this.busy = false
          this.page = this.users.totalPages
          return
        }
        await this.$store.dispatch('loadUsers', {type: 'wechat', page: this.page})

        this.busy = false
      },
      async fetchData () {
        this.loading = true
        console.log('loading ...')
        // let page = this.users.currentPage
        console.log(this.page++)
        // await this.$store.dispatch('loadUsers', {type: this.curType, page: this.users.currentPage})
        this.loading = false
      },
      getType (item) {
        switch (item.type) {
          case 'wechat': {
            return '微信用户'
          }
          default: {
            return '系统'
          }
        }
      },
      getAddress (profile) {
        let addr = ''
        if (profile.city !== undefined && profile.city !== '') {
          addr += profile.city
        }
        if (profile.province !== undefined && profile.province !== '') {
          addr += '-'
          addr += profile.province
        }
        if (profile.country !== undefined && profile.country !== '') {
          addr += '-'
          addr += profile.country
        }
        return addr
      },
      getRole (item) {
        let role = ''
        switch (item.role) {
          case 'administrator':
            role = '管理员'
            break
          case 'editor':
            role = '编辑'
            break
          case 'author':
            role = '作者'
            break
          case 'subscriber':
            role = '订阅者'
            break
          default:
            role = ''
            break
        }
        return role
      }
    },
    computed: {
      remaining () {
        return this.users.count - this.users.data.length
      },
      fetching () {
        return this.$store.state.users.list.fetching
      },
      users () {
        return this.$store.state.users.list.data
      }
    }
  }
</script>
