<template>
  <div class="c-posts-browser__main-header">
    <section-nav basePath="/posts/term"
                 :defaultNav="defaultNav"
                 :navs="navs"
                 :isSearch="isSearch"
                 @input-change="change" />
    <div class="c-posts__header-buttons ">
      <nuxt-link to="/settings/taxonomies/category" class="c-button c-header-button">
        <span class="c-header-button__text">分类管理</span>
      </nuxt-link>
<!--      <nuxt-link to="/settings/taxonomies/category" class="button header-button">
        <span class="header-button__text">添加内容</span>
      </nuxt-link>-->
      <!--<a class="button header-button" @click="$modal.show('demo-login')">-->
      <!--<span class="header-button__text">分类管理</span>-->
      <!--</a>-->
      <!--<nuxt-link to="/podcast" class="button header-button" aria-label="发布节目">-->
      <!--<span class="header-button__text">添加节目</span></nuxt-link>-->
    </div>
    <!--<demo-login-modal/>-->

  </div>
</template>
<script>
  const SEARCH_DEBOUNCE_MS = 300;
  // import DemoLoginModal from '../demo/DemoLoginModal.vue'
  import SectionNav from '~/components/section-nav'

  export default {
    name: 'PodcastsBrowserMainHeader',
    props: {
      navs: {
        type: Array
      }
    },
    data () {
      return {
        isOpen: false,
        isFocus: false,
        isSearch: true,
        defaultNav: {
          name: '全部',
          slug: '/posts'
        }
      }
    },
    components: {
      SectionNav
    },
    methods: {
      change (v) {
        this.$emit('input-change', v)
      },
      toggleSearch () {
        this.isOpen = !this.isOpen
        this.isFocus = !this.isFocus
      }
    },
    computed: {
      searchClass () {
        return [
          'is-expanded-to-container',
          {
            'is-open': this.isOpen
          },
          {
            'has-focus': this.isFocus
          },
          'has-open-icon',
          'search'
        ]
      }
    }
  }
</script>
