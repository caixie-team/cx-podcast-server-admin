<template>
  <post-editor v-model="detail"
               :isNew="isNew"
               :isSaving="isSaving"
               :add-asset-confirm="handleAssetConfirm"
               @change="handleChange"
               @publish="handlePublish"
               @publish-action="handlePublishAction"/>
</template>
<script>
  /* eslint-disable no-empty prefer-const */
  import EmptyContent from '~/components/empty-content'
  import {CompactCard} from '~/components/card'

  import {PostEditor} from '~/components/post-editor'
  import {map} from 'lodash'

  import '~/icons/gridicons-cloud-upload'
  import '~/icons/gridicons-plus-small'
  import '~/icons/gridicons-cog'
  import '~/icons/gridicons-notice'
  import '~/icons/gridicons-bookmark'
  import '~/icons/gridicons-not-visible'

  // 如果 post type === album 将处理音频播放列表
  export default {
    layout: 'c-post-editor',
    components: {
      EmptyContent,
      PostEditor
    },
    // validate ({params}) {
    //   return /^\d+$/.test(params.id)
    // },
    // async fetch ({store, params}) {
    //   await store.dispatch('loadUsers')
    //   await store.dispatch('getPostDetail', params.id)
    // },
    async asyncData ({app, params}) {
      await app.store.dispatch('loadUsers')
      if (params.id && !Object.is(Number(params.id), NaN)) {
        await app.store.dispatch('getPostDetail', params.id)
        return {
          isNew: false
        }
      } else {
        await app.store.commit('post/INIT', app.$auth.state.user)
        return {
          isNew: true
        }
      }
    },
    data () {
      return {
        isSaving: false,
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
        // isNew: false,
        // post: {
        //   title: '标题'
        // },
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
      blockCount () {
        return this.detail.block.length
      },
      hasBlock () {
        return this.detail.block.length > 0
      },
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
      isPostCreating () {
        return this.$store.state.post.detail.creating
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
        if (this.isNew === true) {
          return '新建'
        }
        return this.detail.title ? `修改【${this.detail.title}】` : '新建'
      }
    },
    methods: {
      async handleChange (data) {
        this.isSaving = true
        const formData = Object.assign({}, {id: this.detail.id, author: this.detail.author.id}, data)
        if (this.isNew) {
          await this.$store.dispatch('createPost', {form: formData})
          this.isNew = this.isPostCreating
          // if (!this.isPostCreating && !Object.is(this.detail.id, undefined)) {
          //   history.pushState({state: 1}, 'Auto Save State', `/post/${data.id}`)
          // }
          // create new
        } else {
          await this.$store.dispatch('savePostDetail', {form: formData})
          this.isSaving = this.isDetailSaving
        }
      },
      // handleChangeAuthor (authorId) {
      //   console.log(authorId)
      // this.form.author = authorId
      // },
      async handlePublish (sticky) {
        const isPublish = this.detail.status === 'publish'
        const curData = Object.assign({}, this.detail, {
          status: 'publish',
          categories: this.detail.categories,
          // categories: map(this.detail.categories, 'term_id'),
          sticky: sticky ? sticky : this.detail.sticky
        })
        if (!Object.is(curData.block, undefined)) {
          Reflect.deleteProperty(curData, 'block')
        }
        await this.$store.dispatch('savePostDetail', {form: curData})
        if (!isPublish) {
          this.$router.push('/posts/term/new')
        }
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
              author: this.detail.author,
              status: 'draft',
              sticky: false
            }
          })
        }
        if (action === 'trash') {
          await this.$store.dispatch('savePostDetail', {
            form: {
              id: this.detail.id,
              author: this.detail.author,
              status: 'trash',
              sticky: false
            }
          })
          this.$router.push('/posts/term/new')
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
        let isNew = true
        if (this.detail.block.length > 0) {
          isNew = false
        }
        // 添加 block 并更新 block
        this.$store.commit('post/ADD_BLOCK', data.response.data)
        this.$refs.uploader.remove(data)
        if (isNew) {
          this.handleListChange()
        }
      },
      async handleAssetConfirm (uploader, file) {
        const asset = file.response.data
        if (asset !== null) {
          // console.log(asset)
          // uploader.remove(asset)
          // post format 3 是音频
          const newBlock = {
            title: asset.title || asset.name,
            name: asset.name,
            // 默认 3
            format: 3,
            // format: 'post-format-audio',
            // type: '',
            block: [asset.id]
          }
          const res = await this.$store.dispatch('addPostBlock', newBlock)
          if (res) {
            // this.$toast.success('添加成功')
            uploader.remove(file)
          }
          // const newPost = Object.assign({}, asset, {format: [3]})
          // Reflect.deleteProperty(newPost, 'id')
          // Reflect.deleteProperty(newPost, 'id')
        }
        // asset file
        // this.$store.dispatch('addPostBlock')
      }
    },
    watch: {
      // detail (val) {
      //   this.fullForm = Object.assign({}, this.fullForm, val)
      // }
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

  /*.c-editor-publish-button {*/
  /*min-width: 100px;*/
  /*}*/

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

  .textarea-autosize {
    // Important because otherwise autosize height calculation is incorrect in Safari
    transition: none !important;
  }

  /*.c-post-editor,*/
  /*.c-block-inline-toolbar {*/
  /*div.c-block-toolbar {*/
  /**/
  /*}*/
  /*}*/

  .mce-tinymce {
    display: block;
  }

  .mce-tinymce {
    visibility: inherit !important;
    position: relative;
  }
</style>

