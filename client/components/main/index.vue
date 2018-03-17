<script type="text/jsx">
  export default {
    name: 'Main',
    props: {
      wideLayout: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return [
          'c-main',
          {
            'is-wide-layout': this.wideLayout
          }
        ]
      }
    },
    render () {
      return (
        <main class={this.classes}>
          {this.$slots.default}
        </main>
      )
    }
  }
</script>
