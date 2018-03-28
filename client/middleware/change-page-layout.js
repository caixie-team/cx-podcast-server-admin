export default ({route, store}, next) => {
  // Full Wide Layout
  // const fullWideLayoutPages = ['apps', 'post', 'post-id']
  const fullWideLayoutPages = ['apps', 'post', 'post-id']
  const isFullWideLayout = fullWideLayoutPages.includes(route.name)
  if (!Object.is(store.state.options.fullWideLayout, isFullWideLayout)) {
    store.commit('options/SET_FULL_WIDE_LAYOUT', isFullWideLayout)
  }
  store.commit('options/SET_LAYOUT_STATUS', route.name)
  next()
}
