<template>
  <card :class="classes">
    <div :class="headerClasses" @click="headerClickAction">
      <span class="foldable-card__main">
        <slot name="header"></slot>
      </span>
      <span class="foldable-card__secondary">
        <span class="foldable-card__summary">
          <slot name="summary"></slot>
        </span>
        <span class="foldable-card__summary-expanded">
          <slot name="expandedSummary"></slot>
        </span>
        <button
          type="button"
          class="foldable-card__action foldable-card__expand" @click="handleClick">
          <svg
            class="gridicon gridicons-chevron-down" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <g>
              <path d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586"></path>
            </g>
          </svg>
        </button>

      </span>
    </div>
    <div class="foldable-card__content" v-show="isExpanded">
      <slot></slot>
    </div>
  </card>

</template>
<script>
  /* eslint-disable indent,spaced-comment,no-unused-vars */

  import {Card, CompactCard} from '../card'

  export default {
    name: 'FoldableCard',
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
      const that = this
      this.isExpanded = this.expanded
      const oldData = this.watchData
      this.$watch('watchData', {
        deep: true,
        handler: (val, oldVal) => {
          if (val.title !== this.originalData.title) {
            that.dataStatus = 'editing'
          } else {
            this.dataStatus = ''
          }
        }
      })
//      this.$watch(this.watchData, () => {
//        this.dataStatus = 'editing'
//      }, {deep: true})
    },
    props: {
      watchData: {
        type: Object
      },
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
      clickableHeader: Boolean
    },
    components: {
      Card,
      CompactCard
    },
    computed: {
      saving () {
        return this.$store.state.posts.item.saving
      },
      headerClasses () {
        return [
          'foldable-card__header',
          {
            'is-clickable': !!this.clickableHeader,
            'has-border': !!this.$slots.summary
          }
        ]
      },
      classes () {
        return [
          'foldable-card',
          {
            'is-compact': !!this.compact,
            'is-disabled': !!this.disabled,
            'is-expanded': !!this.isExpanded,
            'has-expanded-summary': !!this.$slots.expandedSummary,
            'is-warning': !!this.saving
//            'is-warning': this.dataStatus === 'editing'
          }
        ]
      }
    },
    methods: {
      headerClickAction (event) {
        return this.clickableHeader ? this.handleClick(event) : null
      },
      handleClick () {
        this.isExpanded = !this.isExpanded
      }
    }/*,
    watch: {
      watchData: {
        handler: (val, oldVal) => {
          if (val) {
            this.dataStatus = true
          }
        },
        deep: true
      }
    }*/
  }
</script>
