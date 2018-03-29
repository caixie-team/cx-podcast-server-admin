<template>
  <div>
    <editor-status-placeholder :className="statusClass" v-if="!this.post"/>
    <button :class="classes" v-else>
      <strong>{{label}}</strong>
    </button>
  </div>

</template>

<script>
  import EditorStatusPlaceholder from './editor-status-label'

  export default {
    name: 'StatusLabel',
    components: {
      EditorStatusPlaceholder
    },
    props: {
      post: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        statusClass: 'c-editor-status-label'
      }
    },
    computed: {
      label () {
        let label = ''
        switch (this.post.status) {
          case 'publish': {
            label = '已发布'
            break
          }
          case 'private': {
            label = '已私下发布'
            break
          }
          case 'draft': {
            label = '已保存为草稿'
            break
          }
          case 'pending': {
            label = '审核中'
            break
          }
          case 'future': {
            label = '将于 --- 时间发布'
            break
          }
          case 'trash': {
            label = '已删除至回收站'
            break
          }
          default: {
            label = ''
            break
          }
        }
        return label
      },
      classes () {
        return [
          this.statusClass,
          'is-' + this.post.status
        ]
      }
    }
  }
</script>
