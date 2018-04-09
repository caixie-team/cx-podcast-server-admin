<template>
  <div class="c-post-editor">
    <!--<c-dialog-->
      <!--v-model="showDialog"-->
      <!--:on-close="closeDialog">-->
      <!--<p>是否确定要永久删除“{{curTerm.name}}”？</p>-->
    <!--</c-dialog>-->

    <div class="c-post-editor__inner">
      <editor-ground-control
        v-model="detail"
        :isSaving="isSaving"
        @publish="$emit('publish')"
        @menu-action="handleMenuAction"
        @toggle-sticky="handleSticky"
        @close-back="$emit('close-back')"/>
    </div>
    <div class="c-post-editor__content">
      <editor-action-bar v-model="detail" @change-author="handleAuthor" v-if="!isNew"/>
    </div>
    <div class="c-post-editor__inner-content">

      <editor-header palceholder="请输入主题名"
                     v-model="detail.title" @change-title="handleTitle"/>

      <div class="c-main" v-if="!isNew">
        <foldable-card expanded>
          <div slot="header">
            <h3 style="font-weight: 600;">内容信息</h3>
          </div>
          <!--<div slot="summary">-->
          <!--内容详情-->
          <!--</div>-->
          <featured-image v-model="featuredImage"
                          @change="handleFeaturedImage"/>
          <editor-form
            :terms="categories"
            v-model="detail"
            @change="handleFormUpdate"/>
        </foldable-card>

        <!-- 资源列表 -->
        <editor-assets :count="detail.block.length"
                       :confirm="handleAssetConfirm"
                       @uploaded="handleSuccess"
                       v-if="!isNew">
          <post-audio-player
            theme="#14aaf5"
            preload="metadata"
            mode="circulation"
            :defaultPic="detail.featured_image"
            :music="detail.block[0]"
            :list="detail.block"
            @change-list="handleListChange"
            v-if="hasBlock"/>
        </editor-assets>
      </div>
    </div>
  </div>
</template>
<script>
  import EditorGroundControl from './editor-ground-control'
  import EditorActionBar from './editor-action-bar'
  import EditorHeader from './editor-header'
  import FeaturedImage from './featured-image'
  import EditorForm from './editor-form'
  import {PostAudioPlayer} from '~/components/players'
  import EditorAssets from './editor-assets'
  import {map} from 'lodash'
  import {Card} from '~/components/card'
  import FoldableCard from '~/components/foldable-card'
  // import {CDialog} from '~/components/dialog'

  export default {
    name: 'PostEditor',
    components: {
      Card,
      FoldableCard,
      EditorGroundControl,
      EditorActionBar,
      EditorHeader,
      FeaturedImage,
      EditorForm,
      EditorAssets,
      PostAudioPlayer
    },
    props: {
      value: {
        type: Object,
        require: true
      },
      isNew: Boolean,
      isSaving: Boolean,
      addAssetConfirm: {
        type: Function,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        detail: this.value,
        multiple: true,
        fileList: [],
        accept: 'audio/mp3',
        showDialog: false
      }
    },
    computed: {
      featuredImage () {
        if (!Object.is(this.detail.featured_image, undefined)) {
          return this.detail.featured_image
        }
        return ''
      },
      categories () {
        return this.$store.state.categories.data.list
      },
      blockCount () {
        return this.detail.block.length
      },
      hasBlock () {
        return this.detail.block.length > 0
      }
    },
    methods: {
      // closeDialog (action) {
        // if (action === 'ok') {
        //   this.$store.dispatch('deleteCategory', this.curTerm.slug)
        // } else {
        //   this.curTerm = {}
        // }
        // this.showDialog = false
      // },
      handleMenuAction (action) {
        this.$emit('publish-action', action)
      },

      handleSticky (checked) {
        this.$emit('change', {
          sticky: checked
        })
      },
      handleAuthor (author) {
        this.$emit('change', {
          author: author
        })
        /*        await this.$store.dispatch('changePostAuthor',
          {id: this.post.id, author: author.id, data: author})*/
      },
      //
      // Post Data
      //
      handleTitle (title) {
        this.$emit('change',
          {title: title})
      },
      handleFeaturedImage (data) {
        this.$emit('change', {
          featured_image: data.url,
          meta: {
            _thumbnail_id: data.id
          }
        })
      },
      handleFiles (files) {
        this.fileList = files
      },
      removeErrorFile (file) {
        this.$refs.uploader.remove(file)
      },
      handleFormUpdate (form) {
        this.$emit('change', form)
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
      handleAssetConfirm (uploader, data) {
        this.addAssetConfirm(uploader, data)
        // this.$emit('add-asset-confirm', data)
      },
      // 内容添加成功的处理
      handleSuccess (data) {
        // console.log(data)
        // let isNew = true
        // if (this.detail.block.length > 0) {
        //   isNew = false
        // }
        // 添加 block 并更新 block
        // this.$store.commit('post/ADD_BLOCK', data.response.data)
        // if (isNew) {
        //   this.handleListChange()
        // }
      }
    },
    watch: {
      value (val) {
        this.detail = val
      }
    }
  }
</script>
