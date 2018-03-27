<template>
  <button class="c-button is-compact c-remove-button" @click.stop="onRemove">
    <span class="c-remove-button__label screen-reader-text">删除</span>
    <svgicon name="gridicons-cross" class="gridicon c-remove-button__icon"/>
  </button>
</template>

<script>
  import '~/icons/gridicons-cross'

  export default {
    name: 'RemoveButton',
    props: {
      onRemove: {
        type: Function,
        default () {
          return {}
        }
      }
    }
  }
</script>
