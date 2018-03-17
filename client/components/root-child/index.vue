<script type="text/jsx">
  import Vue from 'vue'

  /* eslint-disable */
  export default {
    props: {},
    mounted () {
      // const MyComponent = Vue.extend({
      //   template: '<div>Hello!</div>'
      // })
      // const comp = Vue.extend({
      //   template: '<div>lalala</div>'
      // })
      // this.container = new comp().$mount()
      // this.container = document.createElement('div')
      // document.getElementById('app').appendChild(this.container)
      // this.renderChildren()
      // const component = this.$slots.default.$mount()
      document.getElementById('app').appendChild(component.$el)
    },
    beforeDestroy () {
      if (!this.container) {
        return
      }
      document.getElementById('app').removeChild(this.container)
      // document.body.removeChild(this.container)
      delete this.container
    },
    methods: {
      // renderChildren () {
      //   document.getElementById('app').appendChild(this.container)
      // }
    },

    render () {
      // return null
    }
  }
</script>
