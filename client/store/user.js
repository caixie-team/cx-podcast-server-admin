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
    likes: {
      fetching: false,
      data: {
        'count': 0,
        'totalPages': 0,
        'pagesize': 10,
        'currentPage': 1,
        'data': []
      }
    },
    views: {}
  }
}

export const mutations = {
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
  //
  // 仅保存, 更新状态
  //
  UPDATE_DETAIL (state) {
    state.detail.saving = true
  },
  UPDATE_DETAIL_SUCCESS (state, data) {
    state.detail.saving = false
    state.detail.data = Object.assign({}, state.detail.data, data)
  },
  UPDATE_DETAIL_FAILURE (state) {
    state.detail.saving = false
  },
  UPLOAD_AVATAR_IMAGE (state, avatar) {
    state.data.avatar = avatar
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

  // 喜欢某篇文章
  LIKE_ARTICLE (state, action) {
    const article = state.detail.data
    if (Object.is(article.id, action.id)) {
      state.detail.data.meta.likes++
    }
  }
}
