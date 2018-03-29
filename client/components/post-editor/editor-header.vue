<template>
  <div class="c-post-editor__header">
    <div class="c-editor-title">
      <textarea tabindex="1"
                class="textarea-autosize c-editor-title__input"
                :placeholder="palceholder"
                rows="1"
                style="overflow: hidden; word-wrap: break-word; height: 62px;"
                :value="title" @change="handleChange">
        </textarea>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'PostHeader',
    props: {
      value: {
        type: String
      },
      palceholder: {
        type: String,
        default: '标题'
      }
    },
    data () {
      return {
        title: this.value
      }
    },
    methods: {
      handleChange (event) {
        this.$emit('change-title', event.target.value)
      }
    }
  }
</script>
