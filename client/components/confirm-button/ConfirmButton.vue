<template>
  <a class="c-confirm-button"
     @mousedown.stop="handleClick">
    <slot>删除</slot>
    <div v-if="showConfirm">
      <span class="confirm" @click.stop="handleConfirm">
        <svgicon class="gridicon "
                 name="gridicons-checkmark-circle" color="none #fff"/>

      </span>
      <span class="abort" @click.stop="handleAbort">
        <svgicon class="gridicon"
                 name="gridicons-cross"/>
      </span>

    </div>
  </a>
</template>
<script>
  import '~/icons/gridicons-checkmark-circle'
  import '~/icons/gridicons-checkmark'
  import '~/icons/gridicons-cross'
  import '~/icons/gridicons-cross-small'
  import '~/icons/gridicons-cross-circle'

  export default {
    name: 'ConfirmButton',
    props: {
      value: {
        type: Object
      }
    },
    data () {
      return {
        showConfirm: false
      }
    },
    methods: {
      handleClick (event) {
        this.showConfirm = true
      },
      handleConfirm (event) {
        this.showConfirm = false
        this.$emit('confirm', event)
      },
      handleAbort (event) {
        this.showConfirm = false
        this.$emit('abort', event)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .c-confirm-button {
    z-index: 1;
    position: relative;
    div {
      width: 76px;
      height: 40px;
      top: 50%;
      left: 50%;
      background: #fefefe;
      position: absolute;
      z-index: 100;
      margin: -20px 0 0 -38px;
      animation-duration: 0.4s;
      border-radius: 4px;
      box-shadow: 0 0 6px rgba(46, 48, 56, 0.3);
      .confirm,
      .abort {
        line-height: 32px;
        position: absolute;
        width: 32px;
        height: 32px;
        margin: 0;
        font-size: 21px !important;
        top: 4px;
        text-align: center;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:before {
          line-height: 32px;
          display: block;
        }
      }
      .confirm {
        color: #fff;
        background: #ef4748;
        left: 4px;
      }
      .abort {
        color: #858a95;
        right: 4px;
      }
    }
  }
</style>
