<script>
  import { oneOf } from '../../utils/assist'

  export default {
    name: 'Card',
    props: {
      tagName: {
        type: String,
        default: 'div'
      },
      className: String,
      href: String,
      target: String,
      compact: Boolean,
      type: {
        validator (value) {
          return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default'])
        }
      }
    },
    render (createElement) {
      if (this.href) {
        return createElement('a', {
          class: this.classes,
          attrs: {
            href: this.href,
            target: this.target
          },
          props: {
            class: this.classes
          }
        }, [
          createElement('icon', {
            props: {
              name: this.target ? 'external-link' : 'chevron-right',
              highlight: this.highlight
            },
            attrs: {
              class: 'c-card__link-indicator gridicon fa-icon'
            }
          }),
          this.$slots.default
        ])
      } else {
        return createElement('div', {
          class: this.classes
        }, this.$slots.default)
      }
    },
    computed: {
      classes () {
      // eslint-disable-next-line prefer-const
        let _class = [
          'c-card animate-box fadeInUp animated-fast',
          this.className,
          {
            'is-card-link': !!this.href,
            'is-compact': this.compact
          }
        ]
        if (this.type) {
          _class.push('is-' + this.type)
        }
        return _class
      }
    }
  }
</script>
