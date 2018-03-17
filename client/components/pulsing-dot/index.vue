<style lang="scss">
  $gray: #14aaf5;
  $gray-light: lighten($gray, 33%); //#f3f6f8
  .c-pulsing-dot {
    background: $gray;
    transform: translate3d(0, 0, 0);
    position: absolute;
    top: 45%;
    left: 50%;
    margin-left: -20px 0 0 -20px;
    display: block;
    width: 6px;
    height: 6px;
    border: none;
    box-shadow: 0 0 0 0 rgba(134, 202, 255, 0.5);
    border-radius: 100%;
    v-align: middle;
    animation: dot-pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    animation-play-state: paused;

    &.is-active {
      animation-play-state: running;
    }
  }

  @keyframes dot-pulse {
    to {
      box-shadow: 0 0 0 15px rgba(90, 153, 220, 0);
    }
  }

</style>
<template>
  <div :class="classes"></div>
</template>
<script>
  export default {
    name: 'PulsingDot',
    props: {
      active: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return [
          'c-pulsing-dot',
          {
            'is-active': !!this.active
          }
        ]
      }
    }
  }
</script>
