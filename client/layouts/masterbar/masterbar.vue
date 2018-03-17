<script type="text/jsx">
  export default {
    name: 'Masterbar',
    data () {
      return {name: 'World'}
    },
    render () {
      return (<header id="header" class="c-masterbar">
        {this.$slots.default}
      </header>)
      // return <h1 style="color: red;">{this.name}</h1>
    }
  }
</script>

