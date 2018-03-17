<script type="text/jsx">
  import { noop, omit } from 'lodash';
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
      onMouseOver: noop,
      itemComponent: 'button',
      isExternalLink: {
        type: Boolean
      }
    },

    render () {
      let ItemComponent = this.itemComponent
      if (this.isExternalLink && this.href) {
        ItemComponent = ExternalLink
      } else if (this.href) {
        ItemComponent = 'a'
      }

      return (
        <ItemComponent tabIndex="-1">
          {this.$slots.default}
        </ItemComponent>
      )
    }
  }
</script>
