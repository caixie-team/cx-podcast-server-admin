<template>
  <div class="c-spinner">
    <div class="c-spinner__outer" :style="styleObject">
      <div class="c-spinner__inner"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Spinner',
    props: {
      size: {
        type: Number,
        default: 20
      }
    },
    computed: {
      styleObject () {
        return {
          width: this.size + 'px',
          height: this.size + 'px',
          fontSize: this.size + 'px'
        }
      }
    }
  }
</script>
