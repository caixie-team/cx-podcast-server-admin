<template>
  <dialog-base
    v-model="dialogModal"
    :additionalClassNames="additionalClassNames"
    :onDialogClose="onDialogClose"
    :buttons="buttons"
    @cancel="$emit('cancel')">
    <slot/>
  </dialog-base>
</template>
<script>
  import DialogBase from './dialog-base'

  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      closable: {
        type: Boolean,
        default: true
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      additionalClassNames: {
        type: String
      },
      onClose: {
        type: Function,
        default () {
          return {}
        }
      },
      buttons: {
        type: Array,
        default () {
          return [
            {
              label: '取消',
              action: 'cancel'
            },
            {
              label: '确定',
              action: 'ok',
              isPrimary: true
            }
          ]
        }
      }
    },
    data () {
      return {
        dialogModal: this.value
      }
    },
    mounted () {
    },
    components: {
      DialogBase
    },
    watch: {
      value (val) {
        this.dialogModal = val
      },
      dialogModal (val) {
        this.$emit('visible-change', val)
      }
    },
    methods: {
      onDialogClose (action) {
        this.onClose(action)
      }
    }
  }
</script>
