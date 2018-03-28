<script type="text/jsx">
  import Popover from '~/components/popover';

  export default {
    name: 'PopoverMenu',
    props: {
      autoPosition: {
        type: Boolean,
        default: true
      },
      position: String,
      isVisible: {
        type: Boolean
      },
      reference: {
        type: String
      },
      className: String
    },
    components: {
      Popover
    },
    methods: {
      hide() {
        this.$emit('close')
      }
    },
    render () {
      return (
        <popover
          className={this.className}
          reference={this.reference}
          isVisible={this.isVisible}
          on-click-outside={this.hide}
          position={this.position}>
          <div ref="menu" class="c-popover__menu" tabIndex="-1">
            {this.$slots.default}
          </div>
        </popover>
      )
    }
  }
</script>
