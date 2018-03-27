<template>
  <span :class="wrapperClass" tabindex="0"
        @click="toggle"
        @keydown.space="toggle">
    <input type="checkbox"
           :class="toggleClass"
           :name="name"
           :checked="currentValue"
           :value="currentValue"
           :disabled="disabled">
    <label class="c-form-toggle__label">
      <span class="c-form-toggle__switch"></span>
      <span class="c-form-toggle__label-content">
        <slot/>
      </span>
    </label>
  </span>
</template>
<script>
  import {oneOf} from '../../utils/assist';
  import Emitter from '../../mixins/emitter';

  export default {
    name: 'FormToggle',
    mixins: [ Emitter ],
    props: {
      compact: {
        type: Boolean
      },
      // 更新内容中，或组件更新中
      toggling: {
        type: Boolean
      },
      id: {
        type: String
      },
      value: {
        type: [String, Number, Boolean],
        default: false
      },
      trueValue: {
        type: [String, Number, Boolean],
        default: true
      },
      falseValue: {
        type: [String, Number, Boolean],
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        validator (value) {
          return oneOf(value, ['large', 'small', 'default'])
        }
      },
      name: {
        type: String
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    },
    computed: {
      wrapperClass () {
        return [
          'c-form-toggle__wrapper',
          {
            'is-disabled': this.disabled
          }
        ]
      },
      toggleClass () {
        return [
          'c-form-toggle',
          {
            'is-compact': this.compact,
            'is-toggling': this.toggling
          }

      ]
      }
    },
    methods: {
      toggle (event) {
        event.preventDefault()
        if (this.disabled) {
          return false
        }

        const checked = this.currentValue === this.trueValue ? this.falseValue : this.trueValue;
        this.currentValue = checked;
        this.$emit('input', checked);
        this.$emit('change', checked);
        this.dispatch('FormItem', 'on-form-change', checked);
      }
    },
    watch: {
      value (val) {
        if (val !== this.trueValue && val !== this.falseValue) {
          // eslint-disable-next-line no-throw-literal
          throw 'Value should be trueValue or falseValue.';
        }
        this.currentValue = val;
      }
    }
  }
</script>
