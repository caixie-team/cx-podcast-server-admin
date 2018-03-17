<template>
  <a :href="url" :class="classes">
    <slot name="icon"></slot>
    <!--<icon :name="icon" v-if="icon" class="gridicon"></icon>-->
    <span class="c-masterbar__item-content">
      <slot></slot>
    </span>
  </a>
</template>
<script>
  export default {
    name: 'Item',
    props: {
      url: {
        type: String,
        default: ""
      },
      tooltip: String,
      className: String,
      icon: String,
      isActive: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    computed: {
      classes () {
        return [
          'c-masterbar__item',
          {
            'is-active': this.isActive
          }
        ]
      }
    }
  }
</script>
