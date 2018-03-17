<template>
  <div v-transfer-dom :data-transfer="transfer">
    <div :class="overlayClass" v-if="visible"
         @mousedown.stop="onBackgroundClick"
         @touchstart.stop="onBackgroundClick">
      <div :class="classes"
           @mousedown.stop
           @touchstart.stop
           ref="modal">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
  import TransferDom from '~/directives/transfer-dom'

  export default {
    name: 'Modal',
    directives: {
      TransferDom
    },
    props: {
      isOpen: {
        type: Boolean,
        default: false
      },
      classes: {
        type: Array
      },
      overlayClass: {
        type: Array
      },
      isOk: {
        type: Boolean,
        default: false
      },
      value: {
        type: Boolean,
        default: false
      },
      closeable: {
        type: Boolean,
        default: true
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      title: {
        type: String
      },
      width: {
        type: [Number, String],
        default: 520
      },
      okText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      loading: {
        type: Boolean,
        default: false
      },
      styles: {
        type: Object
      },
      className: {
        type: String
      },
      scrollable: {
        type: Boolean,
        default: false
      },
      transitionNames: {
        type: Array,
        default () {
          return ['ease', 'fade']
        }
      },
      transfer: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        visible: this.value
      }
    },
    methods: {
      close () {
        this.visible = false
        this.$emit('cancel')
      },
      /**
       * Event handler that is triggered when background overlay is clicked
       */
      onBackgroundClick () {
        if (this.maskClosable) {
          this.close()
          // this.toggle(false)
        }
      },
      mask () {
        if (this.maskClosable) {
          this.close()
        }
      },
      cancel () {
        this.close()
      },
      onKeydown (event) {
        if (event.keyCode !== 27) {
          return null
        }
        this.close(true)
      },
    },
    mounted() {
      // ESC close
      document.addEventListener('keydown', this.onKeydown, true);
    },
    beforeDestroy () {
      document.removeEventListener('keydown', this.onKeydown, true);
    },
    watch: {
      value (val) {
        this.visible = val
      },
      visible (val) {
        this.$emit('modal-visible-change', val)
      }
    }
  }
</script>
