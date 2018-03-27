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

  .c-post-assets__header-button {
    align-items: center;
    border: none;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    font-weight: normal;
    justify-content: center;
    min-width: 140px;
  }

  .c-post-assets__header-button {
    align-items: center;
    border: none;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    font-weight: normal;
    justify-content: center;
    min-width: 140px;

    &:hover {
      background-color: #FAFAFA;
    }
  }

  .c-post-assets__header-button .gridicon.gridicons-cloud-upload {
    top: 6px;
  }

  .c-post-assets__header-button__text {
    margin-top: 3px;
    white-space: nowrap;
  }

  .c-section__subtitle {
    font-size: 11px;
    color: #537994;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    height: 16px;
  }

  /*.c-upload-list {*/
  /*display: flex;*/
  /*flex-direction: row;*/
  /*}*/
</style>

<template>
  <div class="c-main ">
    <header-cake
      class="is-compact"
      :title="'修改【' + detail.title + '】'">
      <div slot="action">
        <publish-button :status="fullForm.status"
                        @publish="handlePublish"
                        @action="handlePublishAction"/>
      </div>
    </header-cake>
    <post-header
      :terms="categories"
      v-model="detail"
      @change="handleFormUpdate"/>

    <div class="c-post-assets__main-header">
      <span class="c-section-header__label">
        <span class="c-section-header__label-text">
            资源列表
            <small class="c-section__subtitle">
              {{detail.block.length}} 条
            </small>
        </span>
        <span class="c-count" v-if="detail.assets">{{detail.assets.length}}</span>
      </span>
      <upload :accept="accept"
              :multiple="multiple"
              :on-success="handleSuccess"
              @receive-files="handleFiles" ref="uploader">
        <a class="c-button c-post-assets__header-button "
           style="color: #767576; fill: #767576;">
          <svgicon name="gridicons-cloud-upload"
                   class="gridicon gridicons-cloud-upload"
                   style="width: 18px; height: 18px;" color="none #767576;"/>
          <span class="c-header-button__text">上传资源</span>
        </a>
      </upload>

    </div>

    <!--<draggable v-model="assetList" v-if="isTopic">-->
    <!--<post-asset :asset="item"-->
    <!--:order="assetList.length - index"-->
    <!--v-for="(item,index) in assetList"-->
    <!--:key="item.id"/>-->
    <!--</draggable>-->

    <!--<div class="c-async-load__placeholder" v-if="!isLoading"></div>-->
    <div class="c-upload-list u-mb-medium" v-if="fileList.length > 0">
      <compact-card v-for="file in fileList"
                    :key="file.id"
                    :class="{'is-highlight is-error' : file.error}" style="background: #FAFAFA;">
        <div class="c-upload-item u-flex">
          <div class="c-upload-item__header u-width-50">
            {{file.name}}
          </div>
          <div class="c-upload-item__content u-width-25 u-flex"
               style="font-size: 14px; flex-direction: column; text-align: center;">
            {{file.size | formatSize}}
            <span v-if="file.error" class="u-text-danger" style="font-size: 13px;">
            <svgicon name="gridicons-notice" color="none #ed4d4d" height="16" width="16"/>
            {{file.error | formatError}}
          </span>
          </div>
          <div class="c-upload-item__progress u-width-25  u-flex u-align-items-center u-justify-end"
               style="font-size: 13px;">
            <button class="c-button is-compact" style="min-width: 98px;" v-if="file.error"
                    @click="removeErrorFile(file)">取消
            </button>

            <div class="c-progress-bar is-compact is-pulsing"
                 v-else-if="(file.active || file.progress !== '0.00') && !file.success">
              <div class="c-progress-bar__progress" :style="{width: file.progress + '%'}"></div>
            </div>
            <span class="u-text-success" v-else-if="file.success">上传成功</span>
            <span class="u-text-mute" v-else>队列</span>
          </div>
        </div>
      </compact-card>
    </div>
    <post-audio-player
      theme="#14aaf5"
      preload="metadata"
      mode="circulation"
      :defaultPic="detail.featured_image"
      :music="detail.block[0]"
      :list="detail.block"
      @change-list="handleListChange"
      v-if="detail.block.length > 0"/>
  </div>
</template>
<script>
  /* eslint-disable no-empty prefer-const */
  import EmptyContent from '~/components/empty-content'
  import {PostAudioPlayer} from '~/components/players'
  import HeaderCake from '~/components/header-cake'
  import PostHeader from '~/components/post-header/post-header'
  import Upload from '~/components/upload'
  import FoldableCard from '~/components/foldable-card'
  import {CompactCard} from '~/components/card'
  import PublishButton from '~/components/post-publish-button'

  // import SplitButton from '~/components/split-button'
  // import PopoverMenuItem from '~/components/popover/menu-item'
  // import MenuSeparator from '~/components/popover/menu-separator'

  import {map} from 'lodash'

  import '~/icons/gridicons-cloud-upload'
  import '~/icons/gridicons-plus-small'
  import '~/icons/gridicons-cog'
  import '~/icons/gridicons-notice'
  import '~/icons/gridicons-bookmark'
  import '~/icons/gridicons-not-visible'
  // import {CButton} from '~/components/button'

  // 如果 post type === album 将处理音频播放列表
  export default {
    // layout: 'post-editor',
    // name: 'PostEditor',
    components: {
      HeaderCake,
      EmptyContent,
      PostAudioPlayer,
      PostHeader,
      Upload,
      FoldableCard,
      CompactCard,
      // SplitButton,
      // PopoverMenuItem,
      // MenuSeparator,
      PublishButton
    },
    validate ({params}) {
      // Must be a number
      return /^\d+$/.test(params.id)
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
        accept: 'audio/mp3',
        uploading: false,
        collapsed: true,
        multiple: true,
        fileList: [],
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
        fullForm: Object.assign({}, this.fullForm, this.detail),
        curFeaturedImage: '',
        navList: [
          {id: 1, name: 'all', title: '全部'},
          {id: 2, name: 'unapproved', title: `未审核`},
          {id: 3, name: 'approved', title: '已审核'},
          {id: 4, name: 'trash', title: '回收站'}]
      }
    },
    mounted () {
      this.fullForm = Object.assign({}, this.fullForm, this.detail)
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
      }
    },
    methods: {
      async handlePublish (sticky) {
        this.fullForm = Object.assign({}, this.fullForm,
          {
            status: 'publish',
            categories: map(this.fullForm.categories, 'term_id'),
            sticky: sticky ? sticky : false
          })
        if (!Object.is(this.fullForm.block, undefined)) {
          Reflect.deleteProperty(this.fullForm, 'block')
        }
        await this.$store.dispatch('savePostDetail', {form: this.fullForm})
        this.$router.push('/posts/term/new')
      },
      async handlePublishAction (action) {
        // 发布并推荐置顶 stickys
        if (action === 'publish') {
          await this.handlePublish(true)
        }
        if (action === 'un-publish') {
          await this.$store.dispatch('savePostDetail', {
            form: {
              id: this.detail.id,
              author: this.fullForm.author,
              status: 'draft',
              sticky: false
            }
          })
          this.fullForm.status = 'draft'
          this.fullForm.sticky = false
        }
      },
      handleFiles (files) {
        this.fileList = files
      },
      toggleSetting () {
        this.isToggleSetting = !this.isToggleSetting
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
      },
      removeErrorFile (file) {
        this.$refs.uploader.remove(file)
      },

      handleFormUpdate (form) {
        this.fullForm = Object.assign({}, this.fullForm, form)
      },
      // 处理排序
      handleListChange (list) {
        const form = {
          id: this.detail.id,
          author: this.detail.author,
          block: list ? map(list, 'id') : map(this.detail.block, 'id')
        }
        this.$store.dispatch('savePostDetail', {form: form})
      },
      // 内容添加成功的处理
      handleSuccess (success, data) {
        // 添加 block 并更新 block
        this.$store.commit('post/ADD_BLOCK', data.response.data)
        this.$refs.uploader.remove(data)
      }
    },
    watch: {
      detail (val) {
        this.fullForm = Object.assign({}, this.fullForm, val)
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
