<template>
  <div :class="classes" v-if="loading">
    <pulsing-dot :active="true"></pulsing-dot>
  </div>
</template>
<script>
  import PulsingDot from '~/components/pulsing-dot'

  export default {
    data: () => ({
      loading: false
    }),
    components: {
      PulsingDot
    },
    computed: {
      classes () {
        return [
          'c-layout__loader',
          'is-active'
        ]
      }
    },
    methods: {
      start () {
        this.loading = true
      },
      finish () {
        this.loading = false
      }
    }
  }
</script>
