
<template>
  <card>
    <div class="c-form-fieldset">
      <label class="c-form-label">
        封面图
      </label>

      <div @click.prevent="handleZoom"
           :class="classes"
           :style="collapsed ? `background-image: url(${form.featured_image});` : ''"
           v-if="form.featured_image"
           style="box-sizing: border-box; border: 1px solid #d7d6d7;border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;">
        <confirm-button @confirm="handleRemove"
                        style="position: absolute;top: 0;right: 0;">
          <remove-button/>
        </confirm-button>
        <spinner style="position: relative; top: 50%;" v-if="uploading"/>
        <img :src="form.featured_image"
             class="c-post-image__image"
             v-if="!collapsed"/>
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
        <!--        <div class="c-form-fieldset">
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
                </div>-->
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
        <counted-textarea label="内容介绍"
                          :value="form.content"
                          name="summary"
                          @change="updateContent"
                          v-if="form.content" :disabled="isSaving"/>
<!--        <div class="c-form-buttons-bar">
          <button :class="{'c-button c-form-button is-primary': true, 'disabled' : !isChange, 'is-busy' : isSaving}"
                  @click.prevent="handleSubmit" :disabled="isSaving">保存内容
          </button>
        </div>-->
    </div>

  </card>

<!--  <foldable-card expanded>

    <div class="c-async-load__placeholder" v-if="isUsersFetching"></div>
          <editor-author
            @change-author="handleChangeAuthor"
            :post="value" v-else/>
    <div slot="summary">内容信息</div>

    <div slot="expandedSummary">
    <toggle @change="handleToggleChange"
                  v-model="isSticky"
                  :disabled="!(value.status === 'publish')"
                  compact>推荐
          </toggle>
    </div>
    <div class="c-form-fieldset">
      <label class="c-form-label">
        封面图
      </label>

      <div @click.prevent="handleZoom"
           :class="classes"
           :style="collapsed ? `background-image: url(${form.featured_image});` : ''"
           v-if="form.featured_image"
           style="box-sizing: border-box; border: 1px solid #d7d6d7; ">
        <confirm-button @confirm="handleRemove"
                        style="position: absolute;top: 0;right: 0;">
          <remove-button/>
        </confirm-button>
        <spinner style="position: relative; top: 50%;" v-if="uploading"/>
        <img :src="form.featured_image"
             class="c-post-image__image"
             style="border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;"
             v-if="!collapsed"/>
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
        &lt;!&ndash;        <div class="c-form-fieldset">
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
                </div>&ndash;&gt;
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
        <counted-textarea label="内容介绍"
                          :value="form.content"
                          name="summary"
                          @change="updateContent"
                          v-if="form.content" :disabled="isSaving"/>
        <div class="c-form-buttons-bar">
          <button :class="{'c-button c-form-button is-primary': true, 'disabled' : !isChange, 'is-busy' : isSaving}"
                  @click.prevent="handleSubmit" :disabled="isSaving">保存内容
          </button>
        </div>
      </form>
    </div>

  </foldable-card>-->
</template>
<script>
  import {Card} from '~/components/card'
  import FoldableCard from '~/components/foldable-card'
  import EditorAuthor from '~/components/post-editor/editor-author'
  import CountedTextarea from '~/components/counted-textarea'
  import RemoveButton from '~/components/remove-button'
  import ConfirmButton from '~/components/confirm-button'
  import FormInputValidation from '~/components/forms/form-input-validation'
  import {Checkbox, CheckboxGroup} from '~/components/checkbox'
  import Upload from '~/components/upload'
  import Spinner from '~/components/spinner'
  import {map, xor, find} from 'lodash'
  import Toggle from '~/components/form-toggle'

  import '~/icons/gridicons-add-image'

  export default {
    name: 'PostHeader',
    components: {
      Card,
      FoldableCard,
      RemoveButton,
      ConfirmButton,
      EditorAuthor,
      FormInputValidation,
      Checkbox,
      CheckboxGroup: CheckboxGroup,
      CountedTextarea,
      Upload,
      Spinner,
      Toggle
    },
    props: {
      value: {
        type: Object
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
        isSticky: !!this.value.sticky,
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
      form: {
        handler (val) {
          this.$emit('change', val)
        },
        deep: true
      }
    },
    computed: {
      selectdCategory () {
        if (this.form.categories.length === 1) {
          const curCategory = find(this.terms, ['term_id', this.form.categories[0]])
          if (curCategory) {
            return curCategory.name
          }
        } else {
          return this.form.categories.length + ' 分类'
        }
      },
      isChange: {
        get () {
          // !Object.is(this.form.meta, undefined)
          const cateArray = xor(this.form.categories, map(this.value.categories, 'term_id'))
          return this.errors.has('title') ||
            cateArray.length > 0 ||
            this.form.title !== this.value.title ||
            this.form.content !== this.value.content
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
      },
      //
      // Picture Handle
      //
      handleZoom () {
        this.collapsed = !this.collapsed
      },
      handleRemove () {
        this.collapsed = true
        this.form.featured_image = ''
        this.form = Object.assign({}, this.form, {
          meta: {
            _thumbnail_id: -1
          }
        })
        this.$store.dispatch('savePostDetail', {
          form: {
            id: this.form.id,
            author: this.form.author,
            meta: this.form.meta
          }
        })
      },

      //
      // Toggle Handle
      //
      handleToggleChange (checked) {
        console.log(this.form.author)
        this.$store.dispatch('savePostDetail', {
          form: {
            id: this.form.id,
            author: this.form.author,
            sticky: checked
          }
        })
      },
      toggleSetting () {
        this.isToggleSetting = !this.isToggleSetting
      },

      //
      // Files handle
      //
      onUpload () {
        this.collapsed = true
        this.uploading = true
      },
      handlePreview (url) {
        this.form.featured_image = url
      },
      handleChangeAuthor (authorId) {
        this.form.author = authorId
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
        this.$store.dispatch('savePostDetail', {
          form: {
            id: this.form.id,
            author: this.form.author,
            meta: this.form.meta
          }
        })
        this.uploading = false
      },
      //
      // Form Handle
      //
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
