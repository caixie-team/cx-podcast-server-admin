<template>
  <span>
    <span class="c-author-selector__author-toggle"
          @click="_toggleShowAuthor"
          ref="authorSelector">
      <slot/>
      <svgicon name="gridicons-chevron-down" style="width: 16px; height: 16px;"/>
    </span>
    <popover class="c-author-selector__popover c-popover"
             :isVisible="showAuthorMenu"
             reference="authorSelector"
             @click-outside="close">
      <div class="c-author-selector__infinite-list">
        <popover-menu-item
          class="c-author-selector__menu-item"
          v-for="author in users"
          :key="author.id"
          @click.native="_selectAuthor(author)">
          <user-item :user="author"/>
        </popover-menu-item>
      </div>
    </popover>
  </span>
</template>
<script>
  import Popover from '~/components/popover';
  import PopoverMenuItem from '~/components/popover/menu-item'
  import UserItem from '~/components/user'

  import '~/icons/gridicons-chevron-down'

  export default {
    components: {
      Popover,
      PopoverMenuItem,
      UserItem
    },
    props: {
      users: {
        type: Array,
        default () {
          return []
        }
      },
      onSelect: {
        type: Function,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        showAuthorMenu: false
      }
    },
    methods: {
      close () {
        if (this.showAuthorMenu) {
          this.showAuthorMenu = false
        }
      },
      _selectAuthor (author) {
        this.onSelect(author)
      },
      _toggleShowAuthor () {
        this.showAuthorMenu = !this.showAuthorMenu
      }
    }
  }
</script>
