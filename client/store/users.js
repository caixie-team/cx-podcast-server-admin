/* eslint-disable prefer-reflect,prefer-spread */
/*
*
* 文章数据状态
*
*/
export const state = () => {
  return {
    creating: false,
    saving: false,
    detail: {
      type: '',
      status: '',
      del: '',
      fetching: false,
      creating: false,
      saving: false,
      deleting: false,
      data: {
        id: 0
      }
    },
    list: {
      fetching: false,
      data: {
        'count': 0,
        'totalPages': 0,
        'pagesize': 10,
        'currentPage': 1,
        'data': []
      }
    }
  }
}

export const mutations = {
  SET_POST (state, detail) {
    state.detail = detail
  },
  DELETE (state) {
    state.detail.del = 'start'
  },
  DELETE_SUCCESS (state) {
    state.detail.del = 'success'
  },
  DELETE_FAILURE (state) {
    state.detail.del = 'error'
  },
  CREATE (state) {
    state.detail.creating = true
  },
  CREATE_SUCCESS (state, action) {
    // state.detail.creating = true
    state.detail.data.id = action.data
    // Object.assign(state.detail, detail);
  },
  CREATE_FAILURE (state) {
    state.detail.creating = false
  },
  CREATE_FAILURE_EXIST (state) {
    state.detail.creating = false
    state.detail.data.type = 'exist'
  },
  CREATE_CANCEL (state) {
    state.detail.creating = false
  },
  UPDATE_ITEM (state) {
    state.saving = true
  },
  UPDATE_SUCCESS (state) {
    state.item.saving = false
  },
  // List
  CLEAR_LIST (state) {
    state.list.data = {
      result: {
        pagination: {
          current_page: 0
        },
        data: []
      }
    }
  },
  UPLOAD_AVATAR_IMAGE (state, avatar) {
    state.data.avatar = avatar
  },
  REQUEST_LIST (state) {
    state.list.fetching = true
  },
  GET_LIST_FAILURE (state) {
    state.list.fetching = false
  },
  GET_LIST_SUCCESS (state, action) {
    state.list.fetching = false
    state.list.data = action.data
  },
  ADD_LIST_SUCCESS (state, action) {
    state.list.fetching = false
    state.list.data.data.push.apply(state.list.data.data, action.data.data)
    state.list.data.count = action.data.count
    state.list.data.currentPage = action.data.currentPage
    state.list.data.totalPages = action.data.totalPages
  },
  // Detail
  CLEAR_DETAIL (state) {
    state.detail.data = {}
  },
  UPDATE_DETAIL (state, action) {
    state.detail.data = Object.assign(state.detail.data, action)
    // state.detail.data = action.data
  },
  REQUEST_DETAIL (state) {
    state.detail.fetching = true
  },
  GET_DETAIL_FAILURE (state) {
    state.detail.fetching = false
    state.detail.data = {}
  },
  GET_DETAIL_SUCCESS (state, action) {
    state.detail.fetching = false
    state.detail.data = action.data
  },
  // Hot
  REQUEST_HOT_LIST (state) {
    state.hot.fetching = true
  },
  GET_HOT_LIST_FAILURE (state) {
    state.hot.fetching = false
  },
  GET_HOT_LIST_SUCCESS (state, action) {
    state.hot.fetching = false
    state.hot.data = action.result
  },

  // 喜欢某篇文章
  LIKE_ARTICLE (state, action) {
    const article = state.detail.data
    if (Object.is(article.id, action.id)) {
      state.detail.data.meta.likes++
    }
  }
}
