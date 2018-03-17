<template>
  <posts-browser-list :category="term" :list="fullList"></posts-browser-list>
</template>
<script>
  import {PostsBrowserList} from '~/components/posts'

  export default {
    data () {
      return {
        filter: 'publish',
        collapsed: true,
        term: {}
      }
    },
    // middleware: 'auth',
    components: {
      PostsBrowserList
    },
    computed: {
      fullList () {
        return this.$store.state.posts.fullList.data
      }
    },
    // 获取 ID的 问题
    validate ({params}) {
      return !!params.slug
    },
    async asyncData ({app, params}) {
      if (!Object.is(params.slug, undefined)) {
        switch (params.slug) {
          case 'featured': {
            return {term: {slug: params.slug, name: '精选'}}
          }
          case 'popular': {
            return {term: {slug: params.slug, name: '热门'}}
          }
          case 'new': {
            return {term: {slug: params.slug, name: '最新'}}
          }
          default: {
            const term = (await app.$axios.$get(`/apps/${app.store.getters.appId}/categories/slug:${params.slug}`)).data
            await app.store.dispatch('getPostsFullList', params.slug)
            return {
              term: term
            }
          }
        }
      }
    }
  }
</script>
