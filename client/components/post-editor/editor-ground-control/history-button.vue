<template>
  <div class="c-editor-ground-control__history">
    <button class="c-editor-ground-control__history-button c-button is-link" @click="selectHistory">
      历史记录
    </button>
  </div>
</template>
<script>
  export default {
    props: {
      loadRevision: {
        type: Function,
        default () {
          return {}
        }
      }
    },
    methods: {
      selectHistory () {
        this.loadRevision()
        // open post revisions dialog
        console.log('打开历史记录 dialog')
      }
    }
  }
</script>
