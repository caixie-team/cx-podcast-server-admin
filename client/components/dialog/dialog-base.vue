<template>
  <modal
    v-model="dialogModal"
    :overlayClass="overlayClass"
    :classes="dialogClasses"
    @cancel="$emit('cancel', dialogModal)">
    <div :class="contentClass"
         ref="content" tabindex="-1">
      <slot></slot>
    </div>
    <div :class="buttonsClass">
      <slot name="actions">
        <button class="c-button"
                v-for="button in buttons"
                :key="button.action"
                :class="_getButtonClasses(button)"
                @click="_onButtonClick(button)">
          <span :class="buttonLabelClass">
            {{button.label}}
          </span>
        </button>
      </slot>
    </div>

  </modal>
</template>

<script>
  import Modal from '~/components/modal'

  export default {
    name: 'DialogBase',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      baseClassName: {
        type: String,
        default: 'c-dialog'
      },
      additionalClassNames: {
        type: String
      },
      isFullScreen: {
        type: Boolean,
        default: true
      },
      autoFocus: {
        type: Boolean,
        default: true
      },
      buttons: {
        type: Array,
        default: () => {
          return []
        }
      },
      onDialogClose: {
        type: Function,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        dialogModal: this.value
      }
    },
    methods: {
      _getButtonClasses (button) {
        let classes = button.className || 'c-button'
        if (button.isPrimary || this.buttons.length === 1) {
          classes += ' is-primary'
        }
        if (button.additionalClassNames) {
          classes += ' ' + button.additionalClassNames
        }

        return classes
      },
      _onButtonClick (button) {
        if (button.onClick) {
          button.onClick(this._close.bind(this, button.action))
          return
        }
        this._close(button.action)
      },
      _close (action) {
        this.onDialogClose(action)
      }
    },
    computed: {
      buttonsClass () {
        return this.baseClassName + '__action-buttons'
      },
      buttonLabelClass () {
        return this.baseClassName + '__button-label'
      },
      overlayClass () {
        return [
          this.baseClassName + '__backdrop',
          {
            'is-full-screen': !!this.isFullScreen
          }
        ]
      },
      dialogClasses () {
        return [
          this.baseClassName,
          'c-card',
          this.additionalClassNames
        ]
      },
      contentClass () {
        return this.baseClassName + '__content'
      }
    },
    components: {
      Modal
    },
    watch: {
      value (val) {
        this.dialogModal = val
      },
      dialogModal (val) {
        this.$emit('visible-change', val)
      }
    }
  }
</script>
