<template>
  <split-button
    class="c-editor-ground-control__publish-button"
    :label="label"
    @click="$emit('publish')">
    <popover-menu-item :disabled="isPublish" @click.native.stop="$emit('menu-action', 'publish')">
      <svgicon name="gridicons-bookmark" width="18" height="18" class="gridicon"/>
      发布并推荐
    </popover-menu-item>
    <menu-separator/>
    <popover-menu-item :disabled="!isPublish" @click.native.stop="$emit('menu-action', 'un-publish')">
      <svgicon name="gridicons-not-visible" width="18" height="18" class="gridicon"/>
      撤消发布
    </popover-menu-item>
    <popover-menu-item :disabled="isPublish" @click.native.stop="$emit('menu-action', 'trash')">
      <svgicon name="gridicons-trash" width="18" height="18" class="gridicon" />
      回收站
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
      value: {
        type: String,
        require: true
      }
      // status: {
      //   type: String,
      //   require: true
      // }
    },
    data () {
      return {
        status: this.value
      }
    },
    computed: {
      isPublish () {
        return this.status === 'publish'
      },
      label () {
        return this.status === 'publish' ? '更新' : '发布'
      }
    },
    watch: {
      value (val) {
        this.status = val
      }
    }
  }
</script>
