<style lang="scss">
  .c-post-settings__button {
    .gridicon {
      top: 4px;
      margin-left: 4px;
    }
    transition: all 0.15s ease-in-out;
    svg {
      transition: transform 0.3s ease-in-out;
    }
    &:hover {
      cursor: pointer;
    }

  }

  .is-focus.c-post-settings__button svg {
    transform: rotate(45deg);
  }

  .c-editor-publish-button {
    min-width: 100px;
  }

</style>

<template>
  <div class="c-main ">
    <header-cake :title="'修改【' + detail.title + '】'">
      <div slot="action">
        <!--<button class="c-button is-compact c-editor-publish-button is-primary">发布</button>-->
        <button class="c-button is-compact c-editor-publish-button is-primary is-busy">出版</button>
        <!--<button class="c-button is-compact c-editor-publish-button is-primary">更新</button>-->
      </div>

    </header-cake>
    <post-header :post="detail" v-model="detail"/>

    <div class="c-post-assets__main-header">
      <span class="c-section-header__label">
        <span class="c-section-header__label-text">资源列表</span>
        <span class="c-count" v-if="detail.assets">{{detail.assets.length}}</span>
      </span>
      <div class="c-posts__header-buttons">
        <a class="c-button c-header-button" style="color: #767576; fill: #767576;">
          <svgicon name="gridicons-cloud-upload"
                   class="gridicon gridicons-cloud-upload"
                   style="width: 18px; height: 18px;" color="none #767576;"/>
          <span class="c-header-button__text">上传资源</span>
        </a>
      </div>
    </div>

    <!--{{detail}}-->
    <!---->
    <!--<draggable v-model="assetList" v-if="isTopic">-->
    <!--<post-asset :asset="item"-->
    <!--:order="assetList.length - index"-->
    <!--v-for="(item,index) in assetList"-->
    <!--:key="item.id"/>-->
    <!--</draggable>-->

    <!--<div class="c-async-load__placeholder" v-if="!isLoading"></div>-->
    <post-audio-player
      theme="#14aaf5"
      preload="metadata"
      mode="circulation"
      :defaultPic="detail.featured_image"
      :music="detail.block[0]"
      :list="detail.block"
      :on-remove="handelRemove"
      v-if="detail.block"/>
  </div>
</template>
<script>
  /* eslint-disable no-empty prefer-const */
  import EmptyContent from '~/components/empty-content'
  import {PostAudioPlayer} from '~/components/players'
  import HeaderCake from '~/components/header-cake'
  import PostHeader from '~/components/post-header/post-header'

  import '~/icons/gridicons-cloud-upload'
  import '~/icons/gridicons-plus-small'
  import '~/icons/gridicons-cog'

  // 如果 post type === album 将处理音频播放列表
  export default {
    // layout: 'post-editor',
    // name: 'PostEditor',
    components: {
      HeaderCake,
      EmptyContent,
      PostAudioPlayer,
      PostHeader
    },
    async fetch ({store, params}) {
      await store.dispatch('loadUsers')
      await store.dispatch('getPostDetail', params.id)
    },
    async asyncData ({app, params}) {
      // await app.store.dispatch('loadUsers')
      // if (params.id && !Object.is(Number(params.id), NaN)) {
      //   await app.store.dispatch('getPostDetail', params.id)
      //   await this.getAssets(params.id, 1)
      //
      // } else {
        // await app.store.commit('podcast/INIT')
        // return {
          // episodeList: [],
          // category: params.category
        // }
      // }
    },
    data () {
      return {
        isToggleSetting: false,
        creating: false,
        isVisible: false,
        expanded: true,
        selectedUser: {},
        selected: 1,
        isBulkEdit: false,
        content: '',
        isLoading: false,
        post: {
          title: '标题'
        },
        curFeaturedImage: '',
        navList: [
          {id: 1, name: 'all', title: '全部'},
          {id: 2, name: 'unapproved', title: `未审核`},
          {id: 3, name: 'approved', title: '已审核'},
          {id: 4, name: 'trash', title: '回收站'}]
      }
    },
    mounted () {
      // this.selectedUser = Object.assign({}, this.user)
    },
    computed: {
      featuredImage () {
        if (this.curFeaturedImage) {
          return this.curFeaturedImage
        } else {
          this.curFeaturedImage = ''
          this.curFeaturedImage = this.detail.featured_image
          return this.curFeaturedImage
        }
      },
      isTopic () {
        return this.$store.state.post.detail.data.format === 'post-format-topic'
      },
      isDetailSaving () {
        return this.$store.state.post.detail.saving
      },
      detail () {
        return this.$store.state.post.detail.data
      },
      isUsersFetching () {
        return this.$store.state.users.list.fetching
      },
      user () {
        return this.$auth.state.user
      },
      users () {
        return this.$store.state.users.list.data
      },
      categories () {
        return this.$store.state.categories.data.list
      },
      title () {
        return this.detail.title ? this.detail.title : '标题'
      },
      assets () {
        return this.$store.state.post.assetList
      },
      assetList: {
        get () {
          return this.$store.state.post.assetList.data.data
        },
        set (value) {
          this.$store.commit('post/UPDATE_ASSET_LIST', value)
        }
      }
    },
    methods: {
      toggleSetting () {
        console.log('lalalal')
        this.isToggleSetting = !this.isToggleSetting
      },
      handelRemove (item) {
        console.log('id remove')
        console.log(item)
      },
      async getAssets (postId, page) {
        const params = {
          id: postId,
          page: page,
          format: this.detail.format
        }
        await this.$store.dispatch('getPostAssetList', params)
        this.isLoading = this.assets.fetching
      },
      updateTitle (e) {
        this.post.title = e.target.value
      },
      _selectAuthor (author) {
        this.selectedUser = author
        this.isVisible = false
      },
      authorToggle () {
        this.isVisible = !this.isVisible
      }
    }
  }
</script>
<style lang="scss">
  .sortable-ghost {
    background: rgba(0, 0, 0, .25);
    background: linear-gradient(to right, #008ce3, #14aaf5 100%);
    color: #fff;
    .svg-icon,
    .svg-fill,
    .gridicon {
      fill: #fff;
    }
  }

  .sortable-chosen {
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.10);
    font-weight: 900;
    border: 1px dashed #1d2531;
    transition: all 0.3s;
  }
</style>
