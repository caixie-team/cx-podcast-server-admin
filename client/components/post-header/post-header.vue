<template>
  <foldable-card expanded>
    <div slot="header">
      <div class="c-async-load__placeholder" v-if="isUsersFetching"></div>
      <editor-author :post="post" v-else/>

    </div>
    <div slot="summary">内容信息</div>

    <div slot="expandedSummary">
      <button class="c-button c-editor-sticky is-sticky is-borderless u-mr-small" type="button">
        <svg class="gridicon gridicons-bookmark" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path d="M17 3H7c-1.105 0-2 .896-2 2v16l7-4 7 4V5c0-1.104-.896-2-2-2z"></path>
          </g>
        </svg>
      </button>
      <a :class="{'c-button is-compact is-borderless c-post-settings__button': true, 'is-focus' : isToggleSetting}"
         @click="toggleSetting">
        <svgicon name="gridicons-cog" class="gridicon"/>
      </a>
      <!--<button class="c-button is-compact u-mr-small">设置封面</button>-->
      <!--<button class="c-button is-compact is-primary">更新</button>-->
      <!--<button class="c-button is-compact is-primary">发布</button>-->
    </div>
    <div class="c-form-fieldset">
      <label class="c-form-label">
        封面图
      </label>


      <div @click.prevent="handleZoom"
           :class="classes"
           :style="collapsed ? `background-image: url(${form.featured_image});` : ''"
           v-if="form.featured_image">
        <remove-button :on-remove="handleRemove"/>
        <spinner style="position: relative; top: 50%;" v-if="uploading"/>
        <img :src="form.featured_image" class="c-post-image__image" v-if="!collapsed"/>
      </div>

      <upload class="c-button"
              :accept="accept"
              :on-upload="onUpload"
              :on-preview="handlePreview"
              :on-progress="handleProgress"
              :on-success="handleSuccess" v-show="!form.featured_image">
        <svgicon name="gridicons-add-image"/>
        上传封面图
      </upload>

    </div>
    <div :class="{'u-mt-medium': form.featured_image }">
      <form>
        <div class="c-form-fieldset">
          <label class="c-form-label">
            标题
          </label>
          <input type="text"
                 :value="form.title"
                 autocomplete="off"
                 placeholder="请输入标题"
                 @change="updateTitle">
        </div>
        <counted-textarea label="内容介绍"
                          :value="form.content"
                          name="summary"
                          @change="updateContent"
                          v-if="post.content"/>
        <div class="c-form-buttons-bar">
          <button type="submit" class="c-button c-form-button is-primary" :disabled="!isChange">保存</button>
          <!--<button type="button" class="c-button c-form-button">Secondary Form Button</button>-->
        </div>
      </form>
    </div>
  </foldable-card>

</template>
<script>
  import FoldableCard from '~/components/foldable-card'
  import EditorAuthor from '~/components/post-editor/editor-author'
  import CountedTextarea from '~/components/counted-textarea'
  import RemoveButton from '~/components/remove-button'
  import ConfirmButton from '~/components/confirm-button'

  import Upload from '~/components/upload'
  import Spinner from '~/components/spinner'

  import '~/icons/gridicons-add-image'

  export default {
    name: 'PostHeader',
    components: {
      FoldableCard,
      RemoveButton,
      ConfirmButton,
      EditorAuthor,
      CountedTextarea,
      Upload,
      Spinner
    },
    props: {
      value: {
        type: Object
      },
      post: {
        type: Object,
        require: true
      }
    },
    data () {
      return {
        accept: 'image/png,image/gif,image/jpeg',
        uploading: false,
        collapsed: true,
        isToggleSetting: false,
        // curFeaturedImage: this.post.featured_image,
        form: Object.assign({}, this.value)
      }
    },
    watch: {
      value (val) {
        this.form = Object.assign({}, val)
      },
      form (val) {
        // console.log(val)
        this.$emit('post-form-update', val)
      }
    },
    computed: {
      isChange () {
        return this.form.title !== this.value.title || this.form.content !== this.value.content || !Object.is(this.form.meta, undefined)
      },
      isUsersFetching () {
        return this.$store.state.users.list.fetching
      },
      classes () {
        return [
          'c-post-image',
          {
            'is-collapsed': this.collapsed,
            'is-placeholder': this.uploading
          }
        ]
      }
    },
    methods: {
      updateTitle (e) {
        this.form.title = e.target.value
      },
      updateContent (e) {
        this.from.content = e.target.value
      },
      handleZoom () {
        this.collapsed = !this.collapsed
      },
      handleRemove () {
        this.form.featured_image = ''
        this.form = Object.assign({}, this.form, {
          meta: {
            _thumbnail_id: -1
          }
        })
        // this.form.meta._thumbnail_id = -1
      },
      toggleSetting () {
        this.isToggleSetting = !this.isToggleSetting
      },
      onUpload () {
        this.uploading = true
      },
      handlePreview (url) {
        this.form.featured_image = url
      },
      handleProgress (progress) {
        // console.log(progress + 'x-x-x-x-x-')
        this.uploading = true
      },
      handleSuccess (success, data) {
        // this.form.featured_image = data.url
        this.form = Object.assign({}, this.form, {
          meta: {
            _thumbnail_id: data.id
          }
        })
        this.uploading = false

      }
    }
  }
</script>
