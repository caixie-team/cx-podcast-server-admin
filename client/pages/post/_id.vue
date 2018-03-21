<template>
  <div class="c-post-editor">
    <div class="c-post-editor__inner">
      <editor-ground-control/>
      <div class="c-main c-post-editor__content">
        <div class="c-post-editor__content-editor">
          <div class="c-editor-action-bar">
            <div class="c-editor-action-bar__cell is-left"></div>
            <div class="c-editor-action-bar__cell is-center">

              <div class="c-async-load__placeholder" v-if="!users"/>

              <div class="c-editor-author" @click="authorToggle" v-else>
                <span>
                  <span class="c-author-selector__author-toggle" tabindex="-1">
                  <img
                    class="gravatar"
                    :src="selectedUser.avatar"
                    width="26" height="26">
                    <span class="c-editor-author__name">作者：{{selectedUser.user_nicename}}</span>
                    <svg
                      ref="reference"
                      class="gridicon gridicons-chevron-down" height="16" width="16" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"><g><path
                      d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path></g></svg>
                  </span>
                </span>
              </div>
            </div>
            <div class="c-editor-action-bar__cell is-right">
              <button class="c-button c-editor-sticky is-sticky is-borderless" aria-label="将文章固定到头版" type="button">
                <svg class="gridicon gridicons-bookmark" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24">
                  <g>
                    <path d="M17 3H7c-1.105 0-2 .896-2 2v16l7-4 7 4V5c0-1.104-.896-2-2-2z"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <foldable-card expanded>
            <div slot="header">
              <h3>{{title}}</h3>
            </div>
            <div slot="summary">
              内容信息
            </div>
            <div>
              <form>
                <div class="c-form-fieldset">
                  <label class="c-form-label">
                    标题
                  </label>
                  <input type="text"
                         :value="post.title"
                         autocomplete="off"
                         placeholder="请输入标题"
                         @change="updateTitle">
                </div>
                <counted-textarea label="内容介绍"
                                  v-model="detail.content"
                                  name="summary"
                                  v-if="detail.content"/>
              </form>
            </div>
          </foldable-card>
        </div>
        <!--
        <div class="c-section-nav">
          <h6 class="c-section-nav-group__label">Suggested Searches</h6>
          <div class="c-section-nav__panel ">
            <div class="c-section-nav-group">
              <div class="c-section-nav-tabs">
                <ul class="c-section-nav-tabs__list">
                  <li class="c-section-nav-tab"
                      :class="{'is-selected':selected === item.id}" v-for="(item, index) in navList"
                      :key="item.id">
                    <a class="c-section-nav-tab__link" tabindex="0">
                  <span class="c-section-nav-tab__text">
                    {{ item.title }}
                  </span>
                    </a>
                  </li>

                </ul>
              </div>
            </div>
            <div class="c-section-header__actions">
              <button class="c-button is-compact">
                <svgicon name="gridicons-cloud-upload" class="gridicon needs-offset"/>
                批量上传
              </button>
              <button class="c-button is-compact u-mr-small">
                <svgicon name="gridicons-plus-small" class="gridicon needs-offset"/>
                添加
              </button>
            </div>
          </div>
        </div>
        -->
        <draggable v-model="assetList" v-if="isTopic">
          <post-asset :asset="item"
                      :order="assetList.length - index"
                      v-for="(item,index) in assetList"
                      :key="item.id"/>
        </draggable>
        <post-audio-player
          theme="#14aaf5"
          preload="metadata"
          mode="circulation"
          :music="detail.audios[0]"
          :list="detail.audios"
          :on-remove="handelRemove"
          v-if="detail.audios" />
        <!--<a-player-->
          <!--theme="#14aaf5"-->
          <!--preload="metadata"-->
          <!--mode="circulation"-->
          <!--:music="detail.audios[0]"-->
          <!--:list="detail.audios"-->
          <!--:on-remove="handelRemove"-->
          <!--v-if="detail.audios"/>-->

      </div>
    </div>

  </div>
</template>
<script>
  /* eslint-disable no-empty prefer-const */

  import {EditorGroundControl} from '~/components/post-editor'
  import '~/icons/gridicons-cloud-upload'
  import '~/icons/gridicons-plus-small'
  import FoldableCard from '~/components/foldable-card'
  import CountedTextarea from '~/components/counted-textarea'
  import PostAsset from '~/components/post-assets'
  import EmptyContent from '~/components/empty-content'
  import Draggable from 'vuedraggable'
  import APlayer from '~/components/vue-aplayer'
  import {PostAudioPlayer} from '~/components/players'
  import {CompactCard} from '~/components/card'
  export default {
    // layout: 'post-editor',
    name: 'PostEditor',
    components: {
      Draggable,
      EmptyContent,
      EditorGroundControl,
      FoldableCard,
      CountedTextarea,
      PostAsset,
      APlayer,
      CompactCard,
      PostAudioPlayer
    },
    async asyncData ({app, params}) {
      await app.store.dispatch('loadUsers')
      if (params.id && !Object.is(Number(params.id), NaN)) {
        await app.store.dispatch('getPostDetail', params.id)
      } else {
        // await app.store.commit('podcast/INIT')
        return {
          // episodeList: [],
          category: params.category
        }
      }
    },
    data () {
      return {
        creating: false,
        isVisible: false,
        expanded: true,
        selectedUser: {},
        selected: 1,
        isBulkEdit: false,
        content: '',
        post: {
          title: '标题'
        },
        navList: [
          {id: 1, name: 'all', title: '全部'},
          {id: 2, name: 'unapproved', title: `未审核`},
          {id: 3, name: 'approved', title: '已审核'},
          {id: 4, name: 'trash', title: '回收站'}]
      }
    },
    mounted () {
      this.selectedUser = Object.assign({}, this.user)
      this.getAssets(1)
    },
    computed: {
      isTopic () {
        return this.$store.state.post.detail.data.format === 'post-format-topic'
      },
      detail () {
        return this.$store.state.post.detail.data
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
        return this.$store.state.post.assetList.data
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
      handelRemove (item) {
        console.log('id remove')
        console.log(item)
      },
      getAssets (page) {
        const params = {
          id: this.detail.id,
          page: page
        }
        this.$store.dispatch('getPostAssetList', params)
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
