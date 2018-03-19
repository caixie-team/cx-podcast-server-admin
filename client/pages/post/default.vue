<template>
  <div class="post-editor">
    <div class="post-editor__inner">
      <div class="c-card editor-ground-control">
        <button class="c-button editor-ground-control__back is-borderless" type="button">
          关闭
        </button>
        <div class="editor-ground-control__action-buttons">
          <button class="c-button editor-ground-control__toggle-sidebar is-borderless" type="button">
            <svg class="gridicon gridicons-cog" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path
                  d="M20 12c0-.568-.06-1.122-.174-1.656l1.834-1.612-2-3.464-2.322.786c-.82-.736-1.787-1.308-2.86-1.657L14 2h-4l-.48 2.396c-1.07.35-2.04.92-2.858 1.657L4.34 5.268l-2 3.464 1.834 1.612C4.06 10.878 4 11.432 4 12s.06 1.122.174 1.656L2.34 15.268l2 3.464 2.322-.786c.82.736 1.787 1.308 2.86 1.657L10 22h4l.48-2.396c1.07-.35 2.038-.92 2.858-1.657l2.322.786 2-3.464-1.834-1.613c.113-.535.174-1.09.174-1.657zm-8 4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path>
              </g>
            </svg>
          </button>
          <!--<button class="button editor-ground-control__preview-button" tabindex="4" type="button"><span-->
          <!--class="editor-ground-control__button-label">预览</span></button>-->
          <div class="editor-ground-control__publish-button">
            <button class="c-button editor-publish-button is-primary"
                    tabindex="5"
                    type="button">
              更新
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="c-main post-editor__content">
      <div class="post-editor__content-editor">
        <div class="editor-action-bar">
          <div class="editor-action-bar__cell is-left"></div>
          <div class="editor-action-bar__cell is-center">
            <div class="c-async-load__placeholder" v-if="!users"/>
            <div class="editor-author editor-author__name" v-else>
                <span>
                  <span class="author-selector__author-toggle" tabindex="-1">
                  <img
                    class="gravatar"
                    :src="selectedUser.avatar"
                    width="26" height="26">
                    <span class="editor-author__name">作者：{{selectedUser.user_nicename}}</span>
                    <svg
                      ref="reference"
                      class="gridicon gridicons-chevron-down" height="16" width="16" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"><g><path
                      d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg>
                  </span>
                </span>
            </div>`
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    layout: 'post-editor',
    name: 'PostEditor',
    async asyncData ({app, params}) {
      await app.store.dispatch('loadUsers')
//      const terms = await app.store.dispatch('getTermsByTaxonomy')
      if (params.id && !Object.is(Number(params.id), NaN)) {
        // 获取 post 内容
        // await app.store.dispatch('getPodcast', params.id)
        // const query = {
        //   type: 'post_format',
        //   parent: params.id,
        //   page: 1
        // }
        // const data = (await app.$axios.$get(`/apps/${app.store.getters.appId}/posts`, {params: query})).data
        // await app.store.dispatch('getEpisodeList', query)
        // return {
        //   parent: params.id,
        //   episodeData: data
        //   // episodeList: data.data
        // }
      } else {
        await app.store.commit('podcast/INIT')
        return {
          // episodeList: [],
          category: params.category
        }
      }
    },
    data () {
      return {
        name: 'llala',
        selectedUser: {}
      }
    },
    mounted () {
      this.selectedUser = Object.assign({}, this.user)
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      users () {
        return this.$store.state.users.list.data
      }
    }
  }
</script>
