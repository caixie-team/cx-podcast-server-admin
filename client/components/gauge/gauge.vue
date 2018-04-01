<template>
  <div class="c-gauge">
    <canvas ref="canvas" :width="width" :height="height" />
    <span class="c-gauge__label">
      <span class="gauge__number"></span>
      <span class="gauge__metric">{{metric}}</span>
    </span>
  </div>
</template>
<script>
  export default {
    name: 'Gauge',
    props: {
      percentage: {
        type: Number,
        required: true
      },
      width: {
        type: Number,
        default: 118
      },
      height: {
        type: Number,
        default: 118
      },
      lineWidth: {
        type: Number,
        default: 9
      },
      labelSize: {
        type: Number,
        default: 32
      },
      colors: {
        type: Array,
        default () {
          return ['#e9eff3', '#00aadc']
        }
      }
    },
    updated () {
      const canvas = this.$refs.canvas
      ctx = canvas.getContext('2d')
    }
  }
</script>
