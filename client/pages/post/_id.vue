<template>
  <div class="c-post-editor">
    <div class="c-post-editor__inner">
      <editor-ground-control v-model="detail"/>
    </div>
    <div class="c-post-editor__content">
      <div class="c-editor-action-bar">
        <div class="c-editor-action-bar__cell is-left">
          <button class="c-editor-status-label__placeholder c-editor-status-label">
            <strong>正在加载文章…</strong>
          </button>
        </div>
        <div class="c-editor-action-bar__cell is-center">
          <div class="c-async-load__placeholder" v-if="isUsersFetching"></div>
          <editor-author
            @change-author="handleChangeAuthor"
            :post="detail" v-else/>
        </div>
        <div class="c-editor-action-bar__cell is-right">
          <button class="c-button c-editor-sticky is-sticky is-borderless" type="button">
            <svg class="gridicon gridicons-bookmark" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
              <g>
                <path d="M17 3H7c-1.105 0-2 .896-2 2v16l7-4 7 4V5c0-1.104-.896-2-2-2z"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="c-post-editor__inner-content">
      <div class="c-post-editor__header">

        <div class="c-editor-title">
          <textarea tabindex="1" class="textarea-autosize c-editor-title__input"
                    placeholder="标题"
                    rows="1"
                    style="overflow: hidden; word-wrap: break-word; height: 62px;"
                    :value="detail.title">

        </textarea>
        </div>

      </div>

      <div class="c-main">
        <!--
        <header-cake
              class="is-compact"
              :title="title">
              <div slot="action">
                <publish-button :status="fullForm.status"
                                @publish="handlePublish"
                                @action="handlePublishAction"/>
              </div>
            </header-cake>
            -->
        <post-header
          :terms="categories"
          v-model="detail"
          @change="handleFormUpdate"/>
        <!--
        <div class="tinymce-container editor-mode-tinymce">
          <div style="visibility: hidden;  border-width: 1px; width: 100%; padding-top: 38px;"
               class="mce-tinymce mce-container mce-panel is-">
            <div id="mceu_27-body" class="mce-container-body mce-stack-layout">
              <div id="mceu_28" class="mce-toolbar-grp mce-container mce-panel mce-stack-layout-item mce-first"
                   hidefocus="1" tabindex="-1" role="group">
                <div id="mceu_28-body" class="mce-container-body mce-stack-layout">
                  <div id="mceu_29" class="mce-container mce-toolbar mce-stack-layout-item mce-first" role="toolbar">
                    <div id="mceu_29-body" class="mce-container-body mce-flow-layout">
                      <div id="mceu_30" class="mce-container mce-flow-layout-item mce-first mce-last mce-btn-group"
                           role="group">
                        <div id="mceu_30-body">
                          <div id="mceu_0"
                               class="mce-widget mce-btn mce-wpcom-insert-menu mce-insert-menu mce-menubtn mce-first"
                               tabindex="-1" aria-labelledby="mceu_0" role="button" aria-label="添加内容" aria-haspopup="true"
                               aria-expanded="false">
                            <button id="mceu_0-open" role="presentation" type="button" tabindex="-1">
                              <div class="wpcom-insert-menu__menu" data-reactroot="">
                                <svg class="gridicon gridicons-add-outline wpcom-insert-menu__menu-icon" height="24"
                                     width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                  <g>
                                    <path
                                      d="M12 4c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"></path>
                                  </g>
                                </svg>
                                <span class="wpcom-insert-menu__menu-label">添加</span></div>
                            </button>
                          </div>
                          <div id="mceu_1"
                               class="mce-widget mce-btn mce-menubtn mce-fixed-width mce-listbox mce-btn-has-text"
                               tabindex="-1" aria-labelledby="mceu_1" role="button" aria-haspopup="true"
                               aria-expanded="false">
                            <button id="mceu_1-open" role="presentation" type="button" tabindex="-1"><span
                              class="mce-txt">段落</span> <i class="mce-caret"></i></button>
                          </div>
                          <div id="mceu_2" class="mce-widget mce-btn" tabindex="-1" role="button" aria-label="Bold">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-bold"></i>
                            </button>
                          </div>
                          <div id="mceu_3" class="mce-widget mce-btn" tabindex="-1" role="button" aria-label="Italic">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-italic"></i>
                            </button>
                          </div>
                          <div id="mceu_4" class="mce-widget mce-btn" tabindex="-1" role="button"
                               aria-label="Bullet list">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-bullist"></i>
                            </button>
                          </div>
                          <div id="mceu_5" class="mce-widget mce-btn" tabindex="-1" role="button"
                               aria-label="Numbered list">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-numlist"></i>
                            </button>
                          </div>
                          <div id="mceu_6" class="mce-widget mce-btn" tabindex="-1" role="button" aria-label="插入或编辑链接">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-link"></i>
                            </button>
                          </div>
                          <div id="mceu_7" class="mce-widget mce-btn" tabindex="-1" role="button" aria-label="Blockquote">
                            <button role="presentation" type="button" tabindex="-1"><i
                              class="mce-ico mce-i-blockquote"></i></button>
                          </div>
                          <div id="mceu_8" class="mce-widget mce-btn" tabindex="-1" role="button" aria-label="Align left">
                            <button role="presentation" type="button" tabindex="-1"><i
                              class="mce-ico mce-i-alignleft"></i></button>
                          </div>
                          <div id="mceu_9" class="mce-widget mce-btn" tabindex="-1" role="button"
                               aria-label="Align center">
                            <button role="presentation" type="button" tabindex="-1"><i
                              class="mce-ico mce-i-aligncenter"></i></button>
                          </div>
                          <div id="mceu_10" class="mce-widget mce-btn" tabindex="-1" role="button"
                               aria-label="Align right">
                            <button role="presentation" type="button" tabindex="-1"><i
                              class="mce-ico mce-i-alignright"></i></button>
                          </div>
                          <div id="mceu_11" class="mce-widget mce-btn" tabindex="-1" role="button" aria-label="校对作品">
                            <button role="presentation" type="button" tabindex="-1"><i
                              class="mce-ico mce-i-spellchecker"></i></button>
                          </div>
                          <div id="mceu_12" class="mce-widget mce-btn" tabindex="-1" role="button"
                               aria-label="插入“More”标签">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-wp_more"></i>
                            </button>
                          </div>
                          <div id="mceu_13"
                               class="mce-widget mce-btn mce-wpcom-icon-button mce-advanced mce-last mce-btn-has-text"
                               tabindex="-1" role="button" aria-label="展开高级功能" aria-pressed="false">
                            <button type="button" role="presentation" tabindex="-1">
                              <svg class="gridicon gridicons-ellipsis" height="28" width="28"
                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g>
                                  <path
                                    d="M7 12c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm12-2c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-7 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z"></path>
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="mceu_31" class="mce-container mce-toolbar mce-stack-layout-item mce-last" role="toolbar"
                       style="display: none;">
                    <div id="mceu_31-body" class="mce-container-body mce-flow-layout">
                      <div id="mceu_32" class="mce-container mce-flow-layout-item mce-first mce-last mce-btn-group"
                           role="group">
                        <div id="mceu_32-body">
                          <div id="mceu_14" class="mce-widget mce-btn mce-first" tabindex="-1" role="button"
                               aria-label="Strikethrough">
                            <button role="presentation" type="button" tabindex="-1"><i
                              class="mce-ico mce-i-strikethrough"></i></button>
                          </div>
                          <div id="mceu_15" class="mce-widget mce-btn" tabindex="-1" role="button" aria-label="Underline">
                            <button role="presentation" type="button" tabindex="-1"><i
                              class="mce-ico mce-i-underline"></i></button>
                          </div>
                          <div id="mceu_16" class="mce-widget mce-btn" tabindex="-1" role="button"
                               aria-label="Horizontal line">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-hr"></i>
                            </button>
                          </div>
                          <div id="mceu_17" class="mce-widget mce-btn" tabindex="-1" role="button" aria-label="Justify">
                            <button role="presentation" type="button" tabindex="-1"><i
                              class="mce-ico mce-i-alignjustify"></i></button>
                          </div>
                          <div id="mceu_18" class="mce-widget mce-btn mce-colorbutton" role="button" tabindex="-1"
                               aria-haspopup="true" aria-label="Text color">
                            <button role="presentation" hidefocus="1" type="button" tabindex="-1"><i
                              class="mce-ico mce-i-forecolor"></i><span id="mceu_18-preview" class="mce-preview"></span>
                            </button>
                            <button type="button" class="mce-open" hidefocus="1" tabindex="-1"><i class="mce-caret"></i>
                            </button>
                          </div>
                          <div id="mceu_19" class="mce-widget mce-btn" tabindex="-1" role="button"
                               aria-label="Paste as text">
                            <button role="presentation" type="button" tabindex="-1"><i
                              class="mce-ico mce-i-pastetext"></i></button>
                          </div>
                          <div id="mceu_20" class="mce-widget mce-btn" tabindex="-1" role="button"
                               aria-label="Clear formatting">
                            <button role="presentation" type="button" tabindex="-1"><i
                              class="mce-ico mce-i-removeformat"></i></button>
                          </div>
                          <div id="mceu_21" class="mce-widget mce-btn" tabindex="-1" role="button" aria-label="特殊字符">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-charmap"></i>
                            </button>
                          </div>
                          <div id="mceu_22" class="mce-widget mce-btn" tabindex="-1" role="button"
                               aria-label="Decrease indent">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-outdent"></i>
                            </button>
                          </div>
                          <div id="mceu_23" class="mce-widget mce-btn" tabindex="-1" role="button"
                               aria-label="Increase indent">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-indent"></i>
                            </button>
                          </div>
                          <div id="mceu_24" class="mce-widget mce-btn" tabindex="-1" role="button" aria-label="Undo"
                               aria-disabled="false">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-undo"></i>
                            </button>
                          </div>
                          <div id="mceu_25" class="mce-widget mce-btn mce-disabled" tabindex="-1" role="button"
                               aria-label="Redo" aria-disabled="true">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-redo"></i>
                            </button>
                          </div>
                          <div id="mceu_26" class="mce-widget mce-btn mce-last" tabindex="-1" role="button"
                               aria-label="键盘快捷键">
                            <button role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-wp_help"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         -->
        <div class="c-post-assets__main-header">
          <span class="c-section-header__label">
            <span class="c-section-header__label-text">
                资源列表
                <small class="c-section__subtitle">
                  {{blockCount}} 条
                </small>
            </span>
            <!--<span class="c-count" v-if="detail.assets">{{detail.assets.length}}</span>-->
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
        <!--<hr class="c-post-editor__header-divider">-->

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
          v-if="hasBlock"/>
      </div>

    </div>
  </div>
</template>
<script>
  /* eslint-disable no-empty prefer-const */
  import {EditorGroundControl} from '~/components/post-editor'
  import EmptyContent from '~/components/empty-content'
  import {PostAudioPlayer} from '~/components/players'
  import HeaderCake from '~/components/header-cake'
  import PostHeader from '~/components/post-header/post-header'
  import Upload from '~/components/upload'
  import FoldableCard from '~/components/foldable-card'
  import {CompactCard} from '~/components/card'
  import PublishButton from '~/components/post-publish-button'

  import {map} from 'lodash'

  import '~/icons/gridicons-cloud-upload'
  import '~/icons/gridicons-plus-small'
  import '~/icons/gridicons-cog'
  import '~/icons/gridicons-notice'
  import '~/icons/gridicons-bookmark'
  import '~/icons/gridicons-not-visible'
  // import {CButton} from '~/components/button'
  import EditorAuthor from '~/components/post-editor/editor-author'

  // 如果 post type === album 将处理音频播放列表
  export default {
    layout: 'c-post-editor',
    components: {
      EditorGroundControl,
      HeaderCake,
      EditorAuthor,
      EmptyContent,
      PostAudioPlayer,
      PostHeader,
      Upload,
      FoldableCard,
      CompactCard,
      PublishButton
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
      handleChangeAuthor (authorId) {
        console.log(authorId)
        // this.form.author = authorId
      },
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

