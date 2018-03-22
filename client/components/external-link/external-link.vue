<script type="text/jsx">
  import classnames from 'classnames';
  import {assign, omit} from 'lodash';

  export default {
    name: 'ExternalLink',
    props: {
      className: {
        type: String
      },
      href: {
        type: String
      },
      iconSize: {
        type: Number,
        default: 18
      },
      showIconFirst: {
        type: Boolean,
        default: false
      },
      icon: {
        type: Boolean
      },
      iconClassName: {
        type: String
      }
    },

    render () {

      const classes = classnames(
        'c-external-link',
        this.className,
        {
          'icon-first': !!this.showIconFirst
        },
        {
          'has-icon': !!this.icon
        }
      )
      const props = assign(
        {},
        omit(this.props, 'icon', 'iconSize', 'showIconFirst', 'iconClassName'),
        {
          className: classes,
          rel: 'external',
        }
      );
      if (props.target) {
        props.rel = props.rel.concat(' noopener noreferrer');
      }

      const iconComponent = (
        // <a href="https://support.wordpress.com/sitemaps/" target="_blank" class="external-link has-icon"
        //    rel="external noopener noreferrer">详细了解站点地图。
        <svg class="gridicon gridicons-external needs-offset" height="18" width="18"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path
              d="M19 13v6c0 1.105-.895 2-2 2H5c-1.105 0-2-.895-2-2V7c0-1.105.895-2 2-2h6v2H5v12h12v-6h2zM13 3v2h4.586l-7.793 7.793 1.414 1.414L19 6.414V11h2V3h-8z"></path>
          </g>
        </svg>
        // </a>
      )

      return (
        <a {...props}>
          {this.icon && this.showIconFirst && iconComponent}
          {this.$slots.default}
          {this.icon && !this.showIconFirst && iconComponent}
        </a>
      )
    }
  }
</script>
