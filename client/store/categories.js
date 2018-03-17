export const state = () => {
  return {
    id: '',
    api: '',
    detail: {
      fetching: false,
      data: {}
    },
    data: {
      fetching: false,
      list: []
    }
  }
}

export const mutations = {
  NEW_CATEGORY_SUCCESS (state, action) {
    state.data.list.unshift(action)
    // state.data.list.push(action)
    // state.data.list = state.data.list.concat(action.data)
  },
  // 获取机构的应用列表
  REQUEST_CATEGORIES (state) {
    state.data.fetching = true
  },
  REQUEST_CATEGORIES_SUCCESS (state, action) {
    // state.categories = Object.assign({fetching: false}, action)
    state.data.fetching = false
    state.data.list = action.data.categories
  },
  REQUEST_CATEGORIES_FAILURE (state) {
    state.categories.fetching = false
    state.categories.data = []
  },

  UPDATE_CATEGORY_SUCCESS (state, action) {
    state.detail.status = 'success'
    for (let item of state.data.list) {
      if (item.term_id === action.term_id) {
        item = Object.assign(item, action)
      }
    }
  },
  UPDATE_CATEGORY_FAILURE (state) {
    state.detail.status = 'error'
  },
  DELETE_CATEGORY_SUCCESS (state, action) {
    for (let i = 0; i < state.data.list.length; i++) {
      // console.log(state.data.list)
      if (state.data.list[i].slug === action.slug) {
        state.data.list.splice(i, 1)
      }
    }
  }
}
