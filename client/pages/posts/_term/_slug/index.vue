<template>
  <div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="fetching"
      infinite-scroll-distance="20">
      <posts-browser-list
        :title="headerTitle"
        :showPlaceholders="busy"
        :category="term"
        :list="fullList.data" />

    </div>
    <div class="c-scroll-loader u-flex u-mt-large u-align-items-center u-justify-center u-text-mute"
         :style="busy ? 'padding-bottom: 20px;' : 'padding-bottom: 0px;' ">
      <div :class="{'c-scroll-loader-wrapper': true, 'c-scroll-loader-wrapper--active' : busy }"
           style="flex-direction: column;">
        <spinner class="u-mb-small"/>
        <span>还有 {{fullList.count - fullList.data.length}} 条内容</span>
      </div>
    </div>

    <div class="c-list-end" v-if="remaining <= 0">
      <svgicon name="gridicons-status" class="gridicon"></svgicon>
    </div>

    <back-top />
  </div>
</template>
<script>
  import Spinner from '~/components/spinner'
  import BackTop from '~/components/back-top'

  import {PostsBrowserList} from '~/components/posts'
  import '~/icons/gridicons-status'

  export default {
    // middleware: 'auth',
    components: {
      PostsBrowserList,
      Spinner,
      BackTop
    },
    // 获取 ID的 问题
    validate ({params}) {
      return !!params.slug
    },
    async asyncData ({app, params}) {
      if (!Object.is(params.slug, undefined)) {
        switch (params.slug) {
          case 'featured': {
            const query = {
              page: 1,
              category: params.slug
              // status: 'auto-draft'
            }
            await app.store.dispatch('getPostsFullList', query)
            return {term: {slug: params.slug, name: '精选'}}
          }
          case 'popular': {
            const query = {
              page: 1,
              category: params.slug
              // status: 'auto-draft'
            }
            await app.store.dispatch('getPostsFullList', query)
            return {term: {slug: params.slug, name: '热门'}}
          }
          case 'new': {
            const query = {
              page: 1,
              category: params.slug
              // status: 'auto-draft'
            }
            await app.store.dispatch('getPostsFullList', query)
            return {term: {slug: params.slug, name: '最新'}}
          }
          default: {
            const term = (await app.$axios.$get(`/apps/${app.store.getters.appId}/categories/slug:${params.slug}`)).data
            const query = {
              page: 1,
              category: params.slug
              // status: 'auto-draft'
            }
            await app.store.dispatch('getPostsFullList', query)
            return {
              term: term
            }
          }
        }
      }
    },
    data () {
      return {
        filter: 'publish',
        collapsed: true,
        page: 1,
        term: {},
        busy: false
      }
    },
    computed: {
      headerTitle () {
        return `( ${this.fullList.count} ) 条内容`
      },
      remaining () {
        return this.fullList.count - this.fullList.data.length
      },
      fullList () {
        return this.$store.state.posts.fullList.data
      },
      fetching () {
        return this.$store.state.posts.fullList.fetching
      }
    },
    methods: {
      async loadMore () {
        this.busy = true
        this.page++
        if (this.page > this.fullList.totalPages) {
          this.page = this.fullList.totalPages
          this.busy = false
          return
        }
        const params = {
          page: this.page,
          category: this.term.slug,
          status: 'auto-draft'
        }
        await this.$store.dispatch('getPostsFullList', params)
        this.busy = this.fetching
      }
    }
  }
</script>
