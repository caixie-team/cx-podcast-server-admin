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
                 name="title"
                 v-validate="'required'"
                 @change="updateTitle"
                 :disabled="isSaving">
          <form-input-validation :isError="errors.has('title')" v-show="errors.has('title')">
            {{ errors.first('title') }}
          </form-input-validation>
        </div>
        <fieldset class="c-form-fieldset">
          <legend class="c-form-legend">类别
            <small class="c-form-legend__subtitle">
              {{selectdCategory}}
            </small>
          </legend>

          <checkbox-group v-model="form.categories">
            <checkbox :label="term.term_id" v-for="term in terms" :key="term.id">
              {{term.name}}
            </checkbox>
          </checkbox-group>

        </fieldset>
        {{form.content}}
        <counted-textarea label="内容介绍"
                          :value="form.content"
                          name="summary"
                          @change="updateContent"
                          v-if="form.content" :disabled="isSaving"/>
        <div class="c-form-buttons-bar">
          <button :class="{'c-button c-form-button is-primary': true, 'disabled' : !isChange, 'is-busy' : isSaving}"
                  @click.prevent="handleSubmit" :disabled="isSaving">保存
          </button>
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
  import FormInputValidation from '~/components/forms/form-input-validation'
  import {Checkbox, CheckboxGroup} from '~/components/checkbox'

  import Upload from '~/components/upload'
  import Spinner from '~/components/spinner'
  import {map, xor} from 'lodash'

  import '~/icons/gridicons-add-image'

  export default {
    name: 'PostHeader',
    components: {
      FoldableCard,
      RemoveButton,
      ConfirmButton,
      EditorAuthor,
      FormInputValidation,
      Checkbox,
      CheckboxGroup: CheckboxGroup,
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
      },
      terms: {
        type: Array,
        require: true,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        isSaving: false,
        accept: 'image/png,image/gif,image/jpeg',
        uploading: false,
        collapsed: true,
        isToggleSetting: false,
        // curFeaturedImage: this.post.featured_image,
        form: Object.assign({}, {
          id: this.value.id,
          author: this.value.author.id,
          title: this.value.title,
          featured_image: this.value.featured_image,
          content: this.value.content,
          categories: map(this.value.categories, 'term_id')
        })
      }
    },
    watch: {
      value (val) {
        // this.form = Object.assign({}, val)
      },
      'form.categories': {
        handler (val) {
          // console.log(val)
          this.$emit('post-form-update', val)
        },
        deep: true
      }
    },
    computed: {
      selectdCategory () {
        if (this.form.categories.length === 1) {
          return this.value.categories[0].name
        } else {
          return this.form.categories.length + ' 分类'
        }
      },
      // categories () {
      //   return this.$store.state.categories.data.list
      // },
      isChange: {
        get () {
          const cateArray = xor(this.form.categories, map(this.value.categories, 'term_id'))
          return this.errors.has('title') ||
            cateArray.length > 0 ||
            this.form.title !== this.value.title ||
            this.form.content !== this.value.content ||
            !Object.is(this.form.meta, undefined)
        },
        set (val) {
          this.isChange = this.isSaving
        }
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
      updateContent (val) {
        this.form = Object.assign({}, this.form, {content: val})
        // this.form = {
        //   content: val
        // }
        // this.from.content = val
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
        this.uploading = true
      },
      handleSuccess (success, file) {
        this.form.featured_image = file.response.data.url
        this.form = Object.assign({}, this.form, {
          meta: {
            _thumbnail_id: file.response.data.id
          }
        })
        this.uploading = false
      },
      async handleSubmit () {
        this.isSaving = true
        await this.$validator.validateAll()
          .then(async (result) => {
            if (result) {
              await this.$store.dispatch('savePostDetail', {form: this.form})
            } else {
              this.isSaving = false
            }
          })
        this.isSaving = this.$store.state.post.detail.saving
      }
    }
  }
</script>
