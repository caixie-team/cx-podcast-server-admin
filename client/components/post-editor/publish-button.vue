<template>
  <split-button
    class="c-editor-ground-control__publish-button"
    :label="label"
    @click="$emit('publish')">
    <popover-menu-item :disabled="isPublish" @click.native.stop="$emit('action', 'publish')">
      <svgicon name="gridicons-bookmark" width="18" height="18" class="gridicon"/>
      发布并推荐
    </popover-menu-item>
    <menu-separator/>
    <popover-menu-item :disabled="!isPublish" @click.native.stop="$emit('action', 'un-publish')">
      <svgicon name="gridicons-not-visible" width="18" height="18" class="gridicon"/>
      撤消发布
    </popover-menu-item>
  </split-button>

</template>
<script>
  import SplitButton from '~/components/split-button'
  import PopoverMenuItem from '~/components/popover/menu-item'
  import MenuSeparator from '~/components/popover/menu-separator'

  import '~/icons/gridicons-bookmark'
  import '~/icons/gridicons-not-visible'

  export default {
    name: 'PostPublishButton',
    components: {
      SplitButton,
      PopoverMenuItem,
      MenuSeparator
    },
    props: {
      status: {
        type: String,
        require: true
      }
    },
    computed: {
      isPublish () {
        return this.status === 'publish'
      },
      label () {
        return this.status === 'publish' ? '更新' : '发布'
      }
    }
  }
</script>
