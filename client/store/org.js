import {setCookie, setLocalStorage} from "../utils/assist";

export const state = () => {
  return {
    id: '',
    api: '',
    detail: {
      fetching: false,
      data: {}
    },
    currentApp: {},
    // 机构信息
    orgInfo: {
      fetching: false,
      data: {}
    },
    apps: {
      fetching: false,
      data: []
    }
  }
}

export const mutations = {
  SET_ORG_DETAIL (state, data) {
    state.detail.data = data
    // 这里可以设定默认 app
    // state.currentApp = data.apps[0]
    // if (typeof localStorage !== 'undefined') {
    //   localStorage.setItem('__orgId', data.id)
    // }
  },
  SET_CURRENT_APP (state, action) {
    state.currentApp = action
    setCookie('__app', JSON.stringify(action))
    setLocalStorage('__app', JSON.stringify(action))
  },
  CONFIG (state, action) {
    state.id = action.id
    // state.api = action.baseURL + '/rest/orgs/' + action.id
  },
  SET_ID (state, action) {
    state._id = action.id
  },
  // 获取服务端配置的管理员信息
  REQUEST_ORG_INFO (state) {
    state.orgInfo.fetching = true
  },
  REQUEST_ORG_INFO_SUCCESS (state, action) {
    state.orgInfo.fetching = false
    state.orgInfo.data = action.data
  },
  REQUEST_ORG_INFO_FAILURE (state) {
    state.orgInfo.fetching = false
    state.orgInfo.data = {}
  },
  // 获取机构的应用列表
  REQUEST_ORG_APPS (state) {
    state.apps.fetching = true
  },
  REQUEST_ORG_APPS_SUCCESS (state, action) {
    state.apps.fetching = false
    state.apps.data = action.data
  },
  REQUEST_ORG_APPS_FAILURE (state) {
    state.orgInfo.fetching = false
    state.apps.data = []
  }
}
