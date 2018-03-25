<template>
  <c-dialog
    v-model="termModal"
    :on-close="closeDialog"
    additionalClassNames="c-term-form-dialog" @cancel="$emit('cancel')">
    <h3 class="c-form-section-heading">添加新分类 </h3>
    <fieldset class="c-form-fieldset">

      <div class="c-form-text-input-with-affixes">
        <span :class="{'c-form-text-input-with-affixes__prefix': true, 'is-active': uploading}">
          <img :src="`${form.featured_image}?imageMogr2/thumbnail/100x100/q/90/format/jpg/interlace/1`"
               class="c-term-input__img" v-if="form.featured_image">
          <svgicon name="gridicons-image" class="c-term-input__icon" v-else/>
          <spinner class="c-form-text-input-with-affixes__spinner" v-if="uploading"/>
        </span>
        <input id="cateName"
               name="cate_name"
               class="form-text-input"
               v-model="form.name" v-validate="'required'"
               :class="{'c-term-input__text-input': true, 'is-error': errors.has('cate_name') }"
               type="text"
               placeholder="新分类名">

      </div>
      <form-input-validation :isError="errors.has('cate_name')" v-show="errors.has('cate_name')">
        {{ errors.first('cate_name') }}
      </form-input-validation>
      <form-input-validation :isError="errors.has('cate_err')" v-show="errors.has('cate_err')">
        {{ errors.first('cate_err') }}
      </form-input-validation>
      <p class="c-add-picture">
        <upload class="c-picture-action-label"
                :accept="accept"
                :max-size="size"
                :on-preview="handlePreview"
                :on-progress="handleProgress"
                :on-success="handleSuccess">
          <span v-if="!form.featured_image">添加分类图标</span>
          <span v-else>替换分类图标</span>
        </upload>
        <!--<span class="c-add-picture-separator" v-if="form.icon">•</span>-->
        <!--<label class="c-picture-action-label" v-if="form.icon">删除图标</label>-->
      </p>
    </fieldset>

    <fieldset class="c-form-fieldset">
      <legend class="c-form-legend">分类描述</legend>
      <textarea class="c-form-textarea"
                v-model="form.description" />
    </fieldset>
  </c-dialog>
</template>
<script>
  import FormInputValidation from '~/components/forms/form-input-validation'
  import {CDialog} from '~/components/dialog'
  import Upload from '~/components/upload'
  import Spinner from '~/components/spinner'

  import '~/icons/gridicons-image'

  export default {
    name: 'TermAddModal',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      model: {
        type: Object
      },
      showDialog: {
        type: Boolean,
        default: false
      }
    },
    components: {
      // CModal,
      CDialog,
      Spinner,
      FormInputValidation,
      Upload
    },
    data () {
      return {
        termModal: this.value,
        isOk: false,
        size: 1024 * 1024 * 10,
        accept: 'image/png,image/gif,image/jpeg',
        uploading: false,
        form: {
          name: '',
          description: '',
          term_id: '',
          term_taxonomy_id: ''
        },
        isVisible: false
      }
    },
    watch: {
      value (val) {
        this.termModal = val
      },
      termModal (val) {
        this.$emit('visible-change', val)
      },
      showDialog (val) {
        console.log(val + ' show dialog')
        this.isVisible = val
      },
      // isVisible (value) {
      //   this.termModal = this.isVisible
      // },
      model (value) {
        this.form = Object.assign({}, this.form, this.model)
      }
    },
    mounted () {
      // this.termModal = this.isVisible
    },
    computed: {
      isDisabled () {
        return this.form.name === ""
      }
    },
    methods: {
      closeDialog (action) {
        if (action === 'cancel') {
          this.form = {}
          this.termModal = false
        }
        if (action === 'ok') {
          this.handleSubmit()
        }
      },
      hide () {
        this.form = {
        }
        this.termModal = false
      },
      handlePreview (url) {
        this.form.featured_image = url
      },
      handleProgress (progress) {
        this.uploading = true
      },
      handleSuccess (success, file) {
        this.uploading = false
        this.form.featured_image = file.response.data.url
        this.form.meta = {
          '_thumbnail_id': file.response.data.id
        }
      },
      async handleSubmit () {
        await this.$validator.validateAll()
          .then(async (result) => {
            if (result) {
              let data = ''
              if (this.form.slug) {
                data = await this.$store.dispatch('updateCategory', {form: this.form})
              } else {
                data = await this.$store.dispatch('newCategory', {form: this.form})
              }
              if (data) {
                this.errors.add('cate_err', data.errmsg)
              } else {
                this.hide()
              }
            } else {
              this.errors.add('cate_name', '名称为必填项')
            }
          })
      }
    }
  }
</script>
<style lang="scss" scoped>

  .c-add-picture {
    color: #537994;
    display: flex;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    margin: 5px 0 0 0;
    &.is-indented {
      margin-left: 24px;
    }
  }

  .c-add-picture-separator {
    border-bottom: 1px solid transparent;
    color: #9ca6af;
    cursor: default;
    padding-left: 5px;
    padding-right: 5px;
  }

  .c-add-picture .c-picture-action-label {
    border-bottom: 1px dotted #848f99;
    color: #848f99;
    fill: #848f99;
    cursor: pointer;
    &:active {
      border-bottom-style: solid;
      text-decoration: none
    }
    &:hover {
      border-bottom: 1px solid #32c1ff;
      color: #32c1ff;
      fill: #32c1ff;
      text-decoration: none
    }
  }

  .c-term-input {
    position: relative;
    width: 100%;
    .c-term-input__text-input {
      padding-left: 50px;
    }
  }

  .c-term-input__icon-container {
    position: absolute;
    top: 0;
    width: 32px;
    cursor: pointer;
    pointer-events: none;
    display: flex;
    justify-content: space-around;
    padding: 0 5px;
    margin-top: 4px;
    border-right: 1px solid #d7d6d7;
    height: 32px;
  }

  .c-term-input__img {
    position: absolute;
    left: 0;
    top: 0;
    height: 38px;
    width: 38px;
    color: white;
    border: 1px solid;
    box-sizing: border-box;
    border-radius: 2px;
  }

  .c-form-text-input-with-affixes__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    /*z-index: z-index( '.media-library__list-item', '.media-library__list-item-spinner' );*/
  }

  .c-form-text-input-with-affixes__prefix {
    position: relative;
    background: #f8f8f8;
    font-size: 16px;
    line-height: 1.5;
    width: 40px;
    padding: 0;
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    &.is-active {
      &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.75);
        border-radius: 0;
        z-index: 10;
      }
    }
  }

  @-webkit-keyframes input-outline-glow {
    0% {
      border-color: #32c1ff;
      box-shadow: inset 0 0 1px #14aaf5
    }
    40% {
      box-shadow: inset 0 0 2px #14aaf5
    }
    100% {
      border-color: #9ca6af;
      box-shadow: inset 0 1px 0 #e0e6e8
    }
  }

  .c-term-input__icon {
    pointer-events: none;
    max-width: 47px;
    max-height: 47px;
    align-self: center;
  }
</style>
