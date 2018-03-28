<template>
  <span :class="classes">
    <button
      :class="{'c-button c-split-button__main': true,
      'is-compact': compact,
      'is-primary': primary}"
      :style="{width: width + 'px'}"
      @click.stop="$emit('click')"
      :disabled="disabledMain">
        <svgicon :name="icon" class="gridicon" v-if="icon"/>
        {{label}}
    </button>

    <button
      :class="{'c-button c-split-button__toggle': true,
      'is-compact': compact, 'is-primary': primary}"
      @click.stop="handleMenuClick"
      ref="splitButtonToggle" :disabled="disabledToggle">
     <svgicon name="gridicons-chevron-down"
              class="gridicon gridicons-chevron-down c-split-button__toggle-icon"/>
    </button>

    <popover-menu :isVisible="isMenuVisible"
                  @close="hideMenu"
                  :autoPosition="false"
                  position="bottom left"
                  className="c-split-button__menu c-popover"
                  reference="splitButtonToggle">
      <slot></slot>
    </popover-menu>
  </span>
</template>
<script>
  import '~/icons/gridicons-chevron-down'
  import '~/icons/gridicons-globe'
  import {CButton} from '~/components/button'
  import PopoverMenu from '~/components/popover/menu'

  export default {
    name: 'SplitButton',
    components: {
      PopoverMenu,
      CButton
    },
    props: {
      icon: {
        type: String
      },
      compact: {
        type: Boolean
      },
      primary: {
        type: Boolean,
        default: true
      },
      width: {
        type: Number,
        default: 80
      },
      disabled: {
        type: Boolean
      },
      label: {
        type: String
      },
      disabledMain: {
        type: Boolean
      },
      disabledToggle: {
        type: Boolean
      }
    },
    data () {
      return {
        isMenuVisible: false
      }
    },
    computed: {
      classes () {
        return [
          'c-split-button',
          {
            'is-menu-visible': this.isMenuVisible,
            'is-disabled': this.disabled,
            'has-icon-text': this.icon
          }
        ]
      }
    },
    methods: {
      hideMenu () {
        if (this.isMenuVisible) {
          this.isMenuVisible = false
        }
      },
      handleClick (event) {
      },
      handleMainClick () {
      },
      handleMenuClick () {
        this.isMenuVisible = !this.isMenuVisible
      }
    }
  }
</script>
