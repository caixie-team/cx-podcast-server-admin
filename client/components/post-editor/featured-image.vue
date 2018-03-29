<style scoped>
  .c-featured-image {
    box-sizing: border-box;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
</style>
<template>
  <div class="c-form-fieldset">
    <label class="c-form-label">
      封面图
    </label>

    <div @click.prevent="handleZoom"
         :class="classes"
         :style="collapsed ? `background-image: url(${src});` : ''"
         v-if="src">
      <confirm-button @confirm="handleRemove"
                      style="position: absolute;top: 0;right: 0;">
        <remove-button/>
      </confirm-button>
      <spinner style="position: relative; top: 50%;" v-if="uploading"/>
      <img :src="src"
           class="c-post-image__image"
           v-if="!collapsed"/>
    </div>

    <upload class="c-button"
            :accept="accept"
            :on-upload="onUpload"
            :on-preview="handlePreview"
            :on-progress="handleProgress"
            :on-success="handleSuccess" v-show="!src">
      <svgicon name="gridicons-add-image" class="gridicon gridicons-add-image"/>
      上传封面图
    </upload>

  </div>
</template>
<script>
  import Spinner from '~/components/spinner'
  import Upload from '~/components/upload'
  import RemoveButton from '~/components/remove-button'
  import ConfirmButton from '~/components/confirm-button'
  import '~/icons/gridicons-add-image'

  export default {
    components: {
      Spinner,
      Upload,
      RemoveButton,
      ConfirmButton
    },
    props: {
      value: String
    },
    data () {
      return {
        accept: 'image/png,image/gif,image/jpeg',
        uploading: false,
        collapsed: true,
        src: this.value
      }
    },
    computed: {
      classes () {
        return [
          'c-post-image',
          'c-featured-image',
          {
            'is-collapsed': this.collapsed,
            'is-placeholder': this.uploading
          }
        ]
      }
    },
    watch: {
      value (val) {
        this.src = val
      },
      src (val) {
        this.$emit('change-image', val)
      }
    },
    methods: {
      //
      // Picture Handle
      //
      handleZoom () {
        this.collapsed = !this.collapsed
      },
      handleRemove () {
        this.collapsed = true
        this.$emit('change', {
          id: -1,
          url: ''
        })
      },
      onUpload () {
        this.collapsed = true
        this.uploading = true
      },
      handleProgress (progress) {
        this.uploading = true
      },
      handlePreview (url) {
        this.src = url
        // this.form.featured_image = url
      },
      handleSuccess (success, file) {
        // this.src = file.response.data.url
        this.$emit('change', file.response.data)

        // this.form.featured_image = file.response.data.url
        // this.form = Object.assign({}, this.form, {
        //   meta: {
        //     _thumbnail_id: file.response.data.id
        //   }
        // })
        // this.$store.dispatch('savePostDetail', {
        //   form: {
        //     id: this.form.id,
        //     author: this.form.author,
        //     meta: this.form.meta
        //   }
        // })
        this.uploading = false
      }
    }
  }
</script>
