<template>
  <card class="is-compact">
    <slot></slot>
  </card>
</template>
<script>
  import Card from '../card/card.vue'
  export default {
    name: 'CompactCard',
    components: {
      Card
    }
  }
</script>
