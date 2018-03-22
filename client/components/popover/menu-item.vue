<script type="text/jsx">
  import {noop, omit} from 'lodash';
  import ExternalLink from '~/components/external-link';

  export default {
    props: {
      href: {
        type: String
      },
      isSelected: {
        type: Boolean,
        default: false
      },
      focusOnHover: {
        type: Boolean,
        default: true
      },
      onMouseOver: {
        type: Function,
        default: noop
      },
      itemComponent: {
        type: String,
        default: 'button'
      },
      isExternalLink: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return [
          'c-popover__menu-item',
          {'is-selected': this.isSelected}
        ]
      }
    },
    methods: {
      handleMouseOver (event) {
        if (this.focusOnHover) {
          event.target.focus()
          console.log(event.target)
        }
        this.onMouseOver()
      }
    },
    render (createElement) {
      let ItemComponent = this.itemComponent
      if (this.isExternalLink && this.href) {
        ItemComponent = ExternalLink
      } else if (this.href) {
        ItemComponent = 'a'
      }
      // console.log(this.itemComponent)
      // return createElement(
      //   '' + self.itemComponent + '', {
      //     on: {
      //       mouseover: self.handleMouseOver
      //     }
      //   },
      //   this.$slots.default
      // )
      return (
        <ItemComponent
          onMouseOver={this.handleMouseOver}
          tabIndex="-1"
          class={this.classes}>
          {this.$slots.default}
        </ItemComponent>
      )
    }
  }
</script>
