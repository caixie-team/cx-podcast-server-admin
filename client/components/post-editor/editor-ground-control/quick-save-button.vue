<template>
  <div class="c-editor-ground-control__quick-save ">
    <history-button v-if="hasRevisions"/>
    <div class="c-editor-ground-control__status" v-if="isSaving">
      <!--<button v-if="!isSaving" class="c-editor-ground-control__save c-button is-link" @click="onSaveButtonClick" tabindex="3">-->
        <!--保存-->
      <!--</button>-->
      <span class="c-editor-ground-control__save-status">
        {{statusLabel}}
      </span>
    </div>
  </div>
</template>
<script>
  import HistoryButton from './history-button'

  export default {
    name: 'QuickSaveButton',
    components: {
      HistoryButton
    },
    props: {
      isSaving: {
        type: Boolean,
        default: false
      },
      isSaveBlocked: {
        type: Boolean,
        default: false
      },
      isDirty: {
        type: Boolean,
        default: false
      },
      hasContent: {
        type: Boolean,
        default: false
      },
      post: {
        type: Object,
        default: null
      },
      loadRevision: {
        type: Function,
        default () {
          return {}
        }
      },
      onSave: {
        type: Function,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        hasRevisions: false
      }
    },
    computed: {
      showingStatusLabel () {
// eslint-disable-next-line no-extra-parens
        return this.isSaving || (this.post && this.post.id && !this.post.status === 'publish')
      },
      isSaveAvailable () {
      },
      statusLabel () {
        return this.isSaving ? '保存中...' : '已保存'
      }
    }
  }
</script>
