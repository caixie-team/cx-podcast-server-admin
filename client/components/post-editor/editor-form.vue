<template>
  <div :class="{'u-mt-medium': form.featured_image }">
    <fieldset class="c-form-fieldset">
      <legend class="c-form-legend">类别
        <small class="c-form-legend__subtitle">
          {{selectdCategory}}
        </small>
      </legend>
      <checkbox-group v-model="form.categories">
        <checkbox :label="term.term_taxonomy_id" v-for="term in terms" :key="term.term_taxonomy_id">
          {{term.name}}
        </checkbox>
      </checkbox-group>
    </fieldset>

    <counted-textarea label="内容介绍"
                      :value="form.content"
                      name="summary"
                      @change="updateContent"
                      v-if="form.content"/>
  </div>

</template>
<script>
  import FoldableCard from '~/components/foldable-card'
  import CountedTextarea from '~/components/counted-textarea'
  import FormInputValidation from '~/components/forms/form-input-validation'
  import {Checkbox, CheckboxGroup} from '~/components/checkbox'
  import Spinner from '~/components/spinner'
  import {map, xor, find} from 'lodash'

  import '~/icons/gridicons-add-image'

  export default {
    name: 'EditorForm',
    components: {
      FoldableCard,
      FormInputValidation,
      Checkbox,
      CheckboxGroup: CheckboxGroup,
      CountedTextarea,
      // Upload,
      Spinner
      // Toggle,
      // FeaturedImage
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
        form: Object.assign({}, {
          featured_image: this.value.featured_image,
          content: this.value.content,
          categories: this.value.categories ? this.value.categories : []
          // categories: map(this.value.categories, 'term_id')
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
          // const curCategory = find(this.terms, ['term_id', this.form.categories[0]])
          const curCategory = find(this.terms, ['term_taxonomy_id', this.form.categories[0]])
          if (curCategory) {
            return curCategory.name
          }
        } else {
          return this.form.categories.length + ' 分类'
        }
      },
      isChange: {
        get () {
          const cateArray = xor(this.form.categories, map(this.value.categories, 'term_taxonomy_id'))
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
      updateContent (val) {
        // this.form = Object.assign({}, this.form, {content: val})
        this.$emit('change', {
          content: val
        })
      }
      // Toggle Handle
      //
      // handleToggleChange (checked) {
      //   console.log(this.form.author)
      //   this.$store.dispatch('savePostDetail', {
      //     form: {
      //       id: this.form.id,
      //       author: this.form.author,
      //       sticky: checked
      //     }
      //   })
      // },
      // toggleSetting () {
      //   this.isToggleSetting = !this.isToggleSetting
      // },

      //
      // Files handle
      //
      // onUpload () {
      //   this.collapsed = true
      //   this.uploading = true
      // },
      // handlePreview (url) {
      //   this.form.featured_image = url
      // },
      // handleChangeAuthor (authorId) {
      //   this.form.author = authorId
      // },
      // handleProgress (progress) {
      //   this.uploading = true
      // },
      // handleSuccess (success, file) {
      //   this.form.featured_image = file.response.data.url
      //   this.form = Object.assign({}, this.form, {
      //     meta: {
      //       _thumbnail_id: file.response.data.id
      //     }
      //   })
      //   this.$store.dispatch('savePostDetail', {
      //     form: {
      //       id: this.form.id,
      //       author: this.form.author,
      //       meta: this.form.meta
      //     }
      //   })
      //   this.uploading = false
      // },
      //
      // Form Handle
      //
      // async handleSubmit () {
      //   this.isSaving = true
      //   await this.$validator.validateAll()
      //     .then(async (result) => {
      //       if (result) {
      //         await this.$store.dispatch('savePostDetail', {form: this.form})
      //       } else {
      //         this.isSaving = false
      //       }
      //     })
      //   this.isSaving = this.$store.state.post.detail.saving
      // }
    }
  }
</script>
