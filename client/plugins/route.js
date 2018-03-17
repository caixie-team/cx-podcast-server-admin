export default ({app, store}) => {
  app.router.beforeEach((to, from, next) => {
    // console.log(to.path + '---' + from.path)
    store.commit('SET_BACK_HREF', from.path)
    store.commit('SET_TO_HREF', to.path)
    if (to.path === '/people' && from.path === '/people') {
      app.router.push('/people/team')
    }
    next(vm => {
      vm.$store.commit('SET_BACK_HREF', from.path)
    })
  })
}
