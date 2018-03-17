export default ({route, store}, next) => {
  // Full Wide Layout
  const fullWideLayoutPages = ['apps']
  const isFullWideLayout = fullWideLayoutPages.includes(route.name)

  if (!Object.is(store.state.options.fullWideLayout, isFullWideLayout)) {
    store.commit('options/SET_FULL_WIDE_LAYOUT', isFullWideLayout)
  }

  next()
}
