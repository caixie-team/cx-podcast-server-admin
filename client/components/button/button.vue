<!--<template>-->
  <!--<a :class="classes" :href="href" v-if="href"></a>-->
  <!--<button :type="htmlType" :class="classes" :disabled="disabled" @click="handleClick">-->
    <!--<slot></slot>-->
  <!--</button>-->
<!--</template>-->
<script>
  import { oneOf } from '../../utils/assist'

  const prefixCls = 'c-button'

  export default {
    name: 'Button',
    components: {},
    props: {
      to: String,
      href: String,
      type: {
        validator (value) {
          return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default'])
        }
      },
      shape: {
        validator (value) {
          return oneOf(value, ['circle', 'circle-outline'])
        }
      },
      size: {
        validator (value) {
          return oneOf(value, ['small', 'large', 'default'])
        }
      },
      loading: Boolean,
      disabled: Boolean,
      htmlType: {
        default: 'button',
        validator (value) {
          return oneOf(value, ['button', 'submit', 'reset'])
        }
      },
      icon: String,
      long: {
        type: Boolean,
        default: false
      },
      compact: {
        type: Boolean
      },
      primary: Boolean,
      scary: Boolean,
      busy: Boolean,
      borderless: Boolean,
      rel: String
    },
    data () {
      return {
        showSlot: true
      }
    },
    render (createElement) {
      if (this.href) {
        return createElement('a', {
          class: this.classes,
          attrs: {
            href: this.href
          },
          props: {
            class: this.classes
          }
        }, this.$slots.default)
      } else if (this.to) {
        return createElement('nuxt-link', {
          class: this.classes,
          props: {
            to: this.to,
            class: this.classes
          }
        }, this.$slots.default)
      } else {
        return createElement('button', {
          class: this.classes,
          props: {
            disabled: this.disabled
          },
          on: {
            click: this.handleClick
          }
        }, this.$slots.default)
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            'is-compact': this.compact,
            'is-primary': this.primary,
            'is-scary': this.scary,
            'is-busy': this.busy,
            'is-borderless': this.borderless
          }
        ]
      }
    },
    methods: {
      handleClick (event) {
        this.$emit('click', event)
      }
    },
    mounted () {
      this.showSlot = this.$slots.default !== undefined
    }
  }
</script>
