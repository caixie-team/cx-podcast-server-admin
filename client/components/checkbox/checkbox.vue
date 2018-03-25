<template>
  <label class="c-form-label">
    <span :class="classes">
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        v-model="model"
        :name="name"
        @change="change"
        @focus="onFocus"
        @blur="onBlur">
      <input type="checkbox"
            :disabled="disabled"
            :checked="currentValue"
            :name="name"
            @change="change"
            @focus="onFocus"
            @blur="onBlur"  v-else/>

      <svgicon name="gridicons-checkmark"
               class="gridicon gridicons-checkmark"
               style="width: 14px; height: 14px;"
               v-show="currentValue"/>
      <svgicon name="gridicons-minus-small"
               class="gridicon gridicons-minus-small"
               style="width: 16px; height: 16px;"
               v-if="!currentValue && partialChecked"/>
    </span>
    <span><slot v-if="showSlot">{{label}}</slot></span>
  </label>

</template>
<script>
  import '~/icons/gridicons-checkmark'
  import '~/icons/gridicons-minus-small'
  import {findComponentUpward, oneOf} from '../../utils/assist'
  import Emitter from '../../mixins/emitter'

  export default {
    name: 'Checkbox',
    mixins: [Emitter],
    props: {
      disabled: {
        type: Boolean,
        default: false
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
      label: {
        type: [String, Number, Boolean]
      },
      size: {
        validator (value) {
          return oneOf(value, ['small', 'large', 'default'])
        }
      },
      name: {
        type: String
      },
      partialChecked: {
        type: Boolean
      }
    },
    data () {
      return {
        model: [],
        currentValue: this.value,
        group: false,
        showSlot: true,
        parent: findComponentUpward(this, 'CheckboxGroup'),
        focusInner: false
      }
    },
    computed: {
      classes () {
        return ['c-form-checkbox',
          {
            'is-disabled': this.disabled
          }
        ]
      },
      mounted () {
        this.parent = findComponentUpward(this, 'CheckboxGroup');
        if (this.parent) {
          this.group = true;
        }
        if (this.group) {
          this.parent.updateModel(true);
        } else {
          this.updateModel();
          this.showSlot = this.$slots.default !== undefined;
        }
      }
    },
    methods: {
      change (event) {
        if (this.disabled) {
          return false
        }

        const checked = event.target.checked
        this.currentValue = checked

        const value = checked ? this.trueValue : this.falseValue
        this.$emit('input', value)

        if (this.group) {
          this.parent.change(this.model)
        } else {
          this.$emit('change', value)
          this.dispatch('FormItem', 'form-change', value)
        }
      },
      updateModel () {
        this.currentValue = this.value === this.trueValue
      },
      onBlur () {
        // this.focusInner = false
      },
      onFocus () {
        // this.focusInner = true
      }
    },
    watch: {
      value (val) {
        if (val === this.trueValue || val === this.falseValue) {
          this.updateModel()
        } else {
// eslint-disable-next-line no-throw-literal
          throw 'Value should be trueValue or falseValue.'
        }
      }
    }
  }
</script>
