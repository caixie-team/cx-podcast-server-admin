<template>
  <card :class="classes">
    <div :class="headerClasses" @click="headerClickAction">
      <span class="c-foldable-card__main">
        <slot name="header"/>
      </span>
      <span class="c-foldable-card__secondary">
        <span class="c-foldable-card__summary">
          <slot name="summary"/>
        </span>
        <span class="c-foldable-card__summary-expanded">
          <slot name="expandedSummary"/>
        </span>
        <slot name="action">
          <button type="button"
                  class="c-foldable-card__action c-foldable-card__expand" @click="handleClick">
            <svgicon class="gridicon" name="gridicons-chevron-down"/>
          </button>
        </slot>

      </span>
    </div>
    <div class="c-foldable-card__content" v-show="isExpanded">
      <slot/>
    </div>
  </card>

</template>
<script>
  /* eslint-disable indent,spaced-comment,no-unused-vars */

  import {Card, CompactCard} from '../card'
  import '~/icons/gridicons-chevron-down'

  export default {
    name: 'FoldableCard',
    components: {
      Card,
      CompactCard
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      expanded: {
        type: Boolean,
        default: false
      },
      compact: {
        type: Boolean,
        default: false
      },
      clickableHeader: {
        type: Boolean
      }
    },
    data () {
      return {
        dataStatus: '',
        isExpanded: false,
        originalData: null
      }
    },
    created () {
      this.originalData = Object.assign({}, this.watchData)
    },
    mounted () {
      this.isExpanded = this.expanded
    },

    computed: {
      headerClasses () {
        return [
          'c-foldable-card__header',
          {
            'is-clickable': this.clickableHeader,
            'has-border': this.$slots.summary
          }
        ]
      },
      classes () {
        return [
          'c-foldable-card',
          {
            'is-compact': this.compact,
            'is-disabled': this.disabled,
            'is-expanded': this.isExpanded,
            'has-expanded-summary': this.$slots.expandedSummary,
            'is-warning': this.saving
//            'is-warning': this.dataStatus === 'editing'
          }
        ]
      }
    },
    methods: {
      headerClickAction (event) {
        return this.clickableHeader ? this.handleClick(event) : null
      },
      handleClick (e) {
        this.isExpanded = !this.isExpanded
        this.$emit('toggleExpanded', e)
      }
    }
  }
</script>
