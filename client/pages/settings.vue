<template>
  <main class="c-app-settings c-main">
    <section-nav :navs="navs">
      <button type="button"
              class="c-button is-compact is-primary u-mr-small"
              @click="termModal = true"
              v-if="isRouteCategory">
        添加新分类
      </button>
    </section-nav>
    <nuxt-child />
    <term-form-dialog
      v-model="termModal"
      :model="termModel"
      @cancel="cancel"
      @visible-change="visibleChange" />
  </main>
</template>
<script>
  import SectionNav from '~/components/section-nav'
  import TermFormDialog from '~/components/terms/term-form-dialog'
  export default {
    middleware: 'auth',
    name: 'Settings',
    data () {
      return {
        filter: 'publish',
        collapsed: true,
        showDialog: false,
        termModal: false,
        termModel: {},
        SHORT_LIST_LENGTH: 6,
        navs: [
          {name: '常规', slug: 'settings/general'},
          {name: '分类', slug: 'settings/taxonomies/category'}
        ],
        isOpen: false,
        isFocus: false
        // child
      }
    },
    components: {
      SectionNav,
      TermFormDialog
      // CModal
    },
    mounted() {
      this.$on('edit-term', (term) => {
        this.termModel = term
        this.termModal = true
        console.log(this.termModel)
        // console.log(term)
      })
      this.$router.push('/settings/general')
    },
    async fetch ({store, params}) {
      // await store.dispatch('loadCategories')
    },
    computed: {
      isRouteCategory () {
        return this.$route.name === 'settings-taxonomies-category'
      },
      isParent () {
        return this.$route.name === 'settings-general'
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
//      timestamp: function () {
//        return this.$moment(this.posts.attributes.modified).format('YYYY-MM-DD [at] hh:mm')
//      },
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
      cancel () {
        this.termModal = false
      },
      visibleChange (visible) {
        this.termModal = visible
      },
      handleClick () {
        this.collapsed = !this.collapsed
      }
    }
  }
</script>
