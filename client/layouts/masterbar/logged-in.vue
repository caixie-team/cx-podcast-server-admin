<template>
  <masterbar>
    <item url="/" style="margin-right: auto;">
      <span class=" u-flex u-align-items-center">
        <!--<svg class="gridicon gridicons-my-sites c-masterbar__item-logo u-mr-small" height="24" width="24" xmlns="http://www.w3.org/2000/svg"-->
             <!--viewBox="0 0 24 24"><g><path-->
          <!--d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM3.5 12c0-1.232.264-2.402.736-3.46L8.29 19.65C5.456 18.272 3.5 15.365 3.5 12zm8.5 8.5c-.834 0-1.64-.12-2.4-.345l2.55-7.41 2.613 7.157c.017.042.038.08.06.117-.884.31-1.833.48-2.823.48zm1.172-12.485c.512-.027.973-.08.973-.08.458-.055.404-.728-.054-.702 0 0-1.376.108-2.265.108-.835 0-2.24-.107-2.24-.107-.458-.026-.51.674-.053.7 0 0 .434.055.892.082l1.324 3.63-1.86 5.578-3.096-9.208c.512-.027.973-.08.973-.08.458-.055.403-.728-.055-.702 0 0-1.376.108-2.265.108-.16 0-.347-.003-.547-.01C6.418 5.025 9.03 3.5 12 3.5c2.213 0 4.228.846 5.74 2.232-.037-.002-.072-.007-.11-.007-.835 0-1.427.727-1.427 1.51 0 .7.404 1.292.835 1.993.323.566.7 1.293.7 2.344 0 .727-.28 1.572-.646 2.748l-.848 2.833-3.072-9.138zm3.1 11.332l2.597-7.506c.484-1.212.645-2.18.645-3.044 0-.313-.02-.603-.057-.874.664 1.21 1.042 2.6 1.042 4.078 0 3.136-1.7 5.874-4.227 7.347z"></path></g></svg>-->
        <!--<img :src="org.logo_url" style="height: 24px;" class="gridicon u-mr-small">-->
      {{org.name}}
      </span>

    </item>

    <a data-tip-target="me" href="/me" title="更新您的个人资料、个人设置等"
       class="c-masterbar__item c-masterbar__item-me">
      <svg class="gridicon gridicons-user-circle" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18.5c-4.694 0-8.5-3.806-8.5-8.5S7.306 3.5 12 3.5s8.5 3.806 8.5 8.5-3.806 8.5-8.5 8.5zm0-8c-3.038 0-5.5 1.728-5.5 3.5s2.462 3.5 5.5 3.5 5.5-1.728 5.5-3.5-2.462-3.5-5.5-3.5zm0-.5c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"></path>
        </g>
      </svg>
      <span class="c-masterbar__item-content">
      <img alt="Me" class="gravatar"
           :src="`${user.avatarUrl}?imageMogr2/thumbnail/150x150/q/90/format/jpg/interlace/1`"
           width="18" height="18">
        <span class="c-masterbar__item-me-label">我</span>
      </span>
    </a>
  </masterbar>
</template>
<script>
  import Masterbar from './masterbar'
  import Item from './item'

  export default {
    name: 'LoggedIn',
    components: {
      Masterbar,
      Item
    },
    data () {
      return {
        isActive: true
      }
    },
    computed: {
      user () {
        return this.$auth.state.user
      },
      org () {
        return this.$store.state.org.detail.data
      }
    }
  }
</script>
