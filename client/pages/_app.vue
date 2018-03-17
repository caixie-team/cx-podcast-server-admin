<template>
  <c-main :wideLayout="isWideLayout">
    <posts-browser-main-header :navs="navList" />
    <posts-browser v-if="!$route.params.slug"/>
    <nuxt-child :key="$route.params.slug"></nuxt-child>
  </c-main>
</template>
<script>
  import PostsBrowser from '~/components/posts/browser'
  import CMain from '~/components/main'
  //  import ActionMenu from '../../components/podcast/podcast-action'
  import {PostsBrowserMainHeader} from '~/components/posts'

  export default {
    middleware: ['auth'],
    name: 'posts',
    data () {
      return {
        isWideLayout: true,
        filter: 'publish',
        collapsed: true,
        SHORT_LIST_LENGTH: 6,
        visibleCategories: [
          {name: '精选', slug: 'featured'},
          {name: '热门', slug: 'popular'},
          {name: '最新', slug: 'new'}
        ],
        isOpen: false,
        isFocus: false
        // child
      }
    },
    components: {
      CMain,
      PostsBrowserMainHeader,
      PostsBrowser
    },
    async fetch ({store, params}) {
      await store.dispatch('loadCategories')
    },
    computed: {
      navList () {
        const slug = this.$route.params.slug
        let isHome = true
        for (const item of this.visibleCategories) {
          if (item.slug === slug) {
            isHome = false
          }
        }
        if (!isHome) {
          return this.visibleCategories
        }
        return this.$store.state.categories.data.list
      },
      categories () {
        return this.$store.state.categories.data.list
      },
      user () {
        return this.$store.state.user
      },
      emptyTitle () {
        switch (this.filter) {
          case 'publish': {
            return '没有节目内容'
          }
          case 'drafts': {
            return '没有待审核的内容'
          }
          case 'off': {
            return '没有下架内容'
          }
          case 'trashed': {
            return '没有已放入回收站的内容'
          }
          default: {
            return '还没节目内容'
          }
        }
      },
      isNotEmpty () {
        return this.posts.data.length > 0
      },
      posts () {
        return this.$store.state.posts.list
      },
      options () {
        return this.$store.state.options.globalOption.data
      },
      classes () {
        return [
          'post-image',
          {
            'is-collapsed': this.collapsed
          }
        ]
      },
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
    },
    methods: {
      toggleSearch () {
        this.isOpen = !this.isOpen
        this.isFocus = !this.isFocus
      },
      handleClick () {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>
