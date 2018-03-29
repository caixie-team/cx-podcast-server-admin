<template>
  <button :class="classes">
    <strong>{{label}}</strong>
  </button>
</template>
<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'post'
      },
      className: String
    },
    computed: {
      classes () {
        return [
          'c-editor-status-label__placeholder',
          this.className
        ]
      },
      label () {
        // switch type
        if (this.type === 'post') {
          return '内容加载中...'
        }
      }
    }
  }
</script>
