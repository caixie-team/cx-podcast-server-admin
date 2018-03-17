<style>
  .empty-content__title {
    font-size: 34px;
  }
</style>
<template>
  <main data-reactroot="" class="main is-wide-layout" role="main">
    <posts-browser-main-header />
    <posts-list :list="list.data"></posts-list>
    <!--<span>-->
      <!--<podcasts-browser-list :term="term" :expandedLink="false" :slug="true"></podcasts-browser-list>-->
    <!--</span>-->
  </main>
</template>
<script>
  import {PostsList, PostsBrowserMainHeader, PostsBrowserList} from '~/components/posts'

  export default {
    name: 'PodcastStatus',
    layout: 'podcast',
    data () {
      return {
        filter: 'publish',
        collapsed: true
      }
    },
    middleware: 'auth',
    components: {
      PostsBrowserMainHeader,
      PostsBrowserList,
      PostsList
    },
    // 获取 ID的 问题
    validate ({params}) {
      return !!params.status
    },
    async asyncData ({app, params}) {
      if (!Object.is(params.status, undefined)) {
        const data = (await app.$axios.$get(`/app/${app.store.getters.appId}/posts?term=category&status=${params.status}`)).data
        return {
          list: data
        }
      }
    }
  }
</script>
