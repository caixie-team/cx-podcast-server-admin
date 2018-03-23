<script type="text/jsx">
  import classnames from 'classnames';
  import {noop} from 'lodash';

  import PopoverMenu from '~/components/popover/menu'
  // import gridicons-ellipsis
  import '~/icons/gridicons-ellipsis'

  export default {
    name: 'EllipsisMenu',
    props: {
      disabled: false,
      className: {
        type: String
      },
      position: {
        type: String
      },
      popoverClassName: {
        type: String
      }
    },
    data () {
      return {
        isMenuVisible: false
      }
    },
    methods: {
      hideMenu (event) {
        if (this.isMenuVisible) {
          this.isMenuVisible = false
        }
      },
      handleClick (event) {
        this.isMenuVisible = !this.isMenuVisible
      }
    },
    computed: {
      classes () {
        return [
          'c-ellipsis-menu',
          this.className,
          {
            'is-menu-visible': this.isMenuVisible,
            'is-disabled': this.disabled
          }
        ]
      }
    },
    render () {
      const popoverClasses = classnames('c-ellipsis-menu__menu', 'c-popover', this.popoverClassName);

      return (
        <span class={this.classes}>
          <button class="c-button c-ellipsis-menu__toggle is-borderless"
                  onClick={this.handleClick}>
            <span ref="ellipsisIcon">
              <svgicon name="gridicons-ellipsis"
                       class="gridicon gridicons-ellipsis c-ellipsis-menu__toggle-icon"
                       color="none #008be8">
              </svgicon>
            </span>
          </button>
          <PopoverMenu
            reference="ellipsisIcon"
            isVisible={this.isMenuVisible}
            position={this.position}
            onClose={this.hideMenu}
            class={popoverClasses}>
            {this.$slots.default}
          </PopoverMenu>
        </span>
      )
    }
  }
</script>
