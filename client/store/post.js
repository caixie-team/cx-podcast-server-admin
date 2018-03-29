/* eslint-disable */
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
    post: {
      status: '',
      del: '',
      creating: false,
      saving: false,
      deleting: false,
      data: {
        id: 0
      }
    },
    asset: {
      fetching: false,
      data: {
        'count': 0,
        'totalPages': 0,
        'pagesize': 10,
        'currentPage': 1,
        'data': []
      }
    },
    detail: {
      saving: false,
      fetching: false,
      data: {}
    },
    assetList: {
      fetching: false,
      data: {
        'count': 0,
        'totalPages': 0,
        'pagesize': 10,
        'currentPage': 1,
        data: []
      }
    }
  }
}

export const mutations = {
  //
  // INIT
  //
  INIT (state, author) {
    state.detail = Object.assign({}, state.detail, {
        status: 'init',
        data: {
          author: author,
          status: 'init',
          name: '',
          title: '',
          content: '',
          block: []
        }
      })
  },
  //
  // REQUEST Detail
  //
  CLEAR_DETAIL (state) {
    state.detail.data = {}
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

  //
  // 仅保存, 更新状态
  //
  SAVE_DETAIL (state) {
    state.detail.saving = true
  },
  SAVE_DETAIL_SUCCESS (state, data) {
    state.detail.saving = false
    state.detail.data = Object.assign({}, state.detail.data, data)
  },
  SAVE_DETAIL_FAILURE (state) {
    state.detail.saving = false
  },
  //
  // 添加 block
  //
  ADD_BLOCK (state, blockItem) {
    state.detail.data.block.unshift(blockItem)
  },
  SET_BLOCK (state, block) {
    state.detail.data.block = block
  },
  UPDATE_BLOCK_ITEM (state, item) {
    // let block = state.detail.data.block
    for (let i = 0; i < state.detail.data.block.length; i++) {
      if (state.detail.data.block[i].id === item.id) {
        state.detail.data.block[i].title = item.title
        // 其它待添加
      }
    }
  },
  REMOVE_BLOCK_ITEM (state, item) {
    for (let i = 0; i < state.detail.data.block.length; i++) {
      if (state.detail.data.block[i].id === item.id) {
        state.detail.data.block.splice(i, 1)
      }
    }
  },
  //
  // UPDATE Detail
  //
  UPDATE_DETAIL (state) {
    state.detail.saving = true
  },
  CHANGED_AUTHOR (state, author) {
    state.detail.data.author = author
    state.detail.saving = false
  },
  UPDATE_DETAIL_SUCCESS (state, action) {
    state.detail = action.data
    state.detail.saving = false
  },
  UPDATE_DETAIL_FAILURE (state) {
    state.detail.saving = false
  },
  // 喜欢某篇文章
  LIKE_ARTICLE (state, action) {
    const article = state.detail.data
    if (Object.is(article.id, action.id)) {
      state.detail.data.meta.likes++
    }
  },
  //
  // Asset
  //
  REQUEST_ASSET (state) {
    state.asset.fetching = true
  },
  GET_ASSET_FAILURE (state) {
    state.asset.fetching = false
  },
  GET_ASSET_SUCCESS (state, action) {
    state.asset.fetching = false
    state.asset.data = action.data
  },

  // Asset List
  REQUEST_ASSET_LIST (state) {
    state.assetList.fetching = true
  },
  UPDATE_ASSET_LIST (state, list) {
    state.assetList.data.data = list
  },
  GET_ASSET_LIST_FAILURE (state) {
    state.assetList.fetching = false
  },
  GET_ASSET_LIST_SUCCESS (state, action) {
    state.assetList.fetching = false
    state.assetList.data = action.data
  },
  ADD_ASSET_LIST_SUCCESS (state, action) {
    state.assetList.fetching = false
    state.assetList.data.data.push.apply(state.assetList.data.data, action.data.data)
    state.assetList.data.count = action.data.count
    state.assetList.data.currentPage = action.data.currentPage
    state.assetList.data.totalPages = action.data.totalPages
  },

  SET_POST (state, post) {
    state.post = post
  },
  DELETE (state) {
    state.post.del = 'start'
  },
  DELETE_SUCCESS (state) {
    state.post.del = 'success'
  },
  DELETE_FAILURE (state) {
    state.post.del = 'error'
  },
  CREATE (state) {
    state.detail.creating = true
  },
  CREATE_SUCCESS (state, action) {
    state.detail.creating = false
    // state.post.data.id = action.data
    state.detail.data = action.data
    // Object.assign(state.user, user);
  },
  CREATE_FAILURE (state) {
    state.detail.creating = false
  },
  CREATE_CANCEL (state) {
    state.post.creating = false
  },
  UPDATE_ITEM (state) {
    state.saving = true
  },
  UPDATE_ITEM_SUCCESS (state) {
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
  UPLOAD_FEATURED_IMAGE (state) {
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
    state.list.data.data.push.apply(state.list.data.data, action.result.data)
    state.list.data.pagination = action.result.pagination
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
  }
}
