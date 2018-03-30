import {getLocalStorage, getCookie} from '../utils/assist'
import {isEmpty} from 'lodash'

export const state = () => ({
  backHref: '/',
  toHref: '/'
})

export const mutations = {
  SET_BACK_HREF (state, path) {
    state.backHref = path
  },
  SET_TO_HREF (state, path) {
    state.toHref = path
  }
}
export const getters = {
  backHref (state) {
    return state.backHref
  },
  toHref (state) {
    return state.toHref
  },
  orgId (state) {
    return state.org.detail.data.id
  },
  appId (state) {
    return state.org.currentApp.id
  }
}

/**
 * 处理当前应用
 * @param store
 * @param req
 * @returns {Promise<void>}
 */
const syncCurrentApp = async (store, req) => {

  let curApp = store.state.org.currentApp
  if (isEmpty(curApp)) {
    curApp = getCookie('__app', req)
  }
  if (isEmpty(curApp)) {
    curApp = getLocalStorage('__app')
  }
  if (isEmpty(curApp)) {
    curApp = req.session.__org.apps[0]
  }
  if (typeof curApp === 'string') {
    curApp = JSON.parse(curApp)
  }
  store.commit('org/SET_CURRENT_APP', curApp)
}

// global actions
export const actions = {
  // 全局服务初始化
  async nuxtServerInit (store, {app, req}) {
    if (!Object.is(req.session.__org, undefined)) {
      await store.commit('org/SET_ORG_DETAIL', req.session.__org)
    }
    // 同步当前应用信息
    await syncCurrentApp(store, req)
    // await store.commit('org/SET_CURRENT_APP', req.session.__org.apps[0])
  },
  async nuxtClientInit ({commit}, context) {
    console.log('init.....')
  },

  // async setCurrentApp ({commit}, curApp) {
  //   commit('org/SET_CURRENT_APP', curApp)
  // },

  // 获取全局配置
  async loadAppInfo ({commit}) {
    commit('options/REQUEST_GLOBAL_OPTIONS')
    const {data} = await this.$axios.get(`/apps/${this.getters.appId}`)
    if (data && data.errno === 0) {
      commit('options/REQUEST_GLOBAL_OPTIONS_SUCCESS', data)
    } else {
      commit('options/REQUEST_GLOBAL_OPTIONS_FAILURE')
    }
    return data
  },

  // -----------------------------
  // CATEGORYS
  // -----------------------------
  /**
   * 获取类别数据
   * @param commit
   * @returns {Promise<void>}
   */
  async loadCategories ({commit}) {
    commit('categories/REQUEST_CATEGORIES')
    const data = await this.$axios.$get(`/apps/${this.getters.appId}/categories`)
    if (data && data.errno === 0) {
      commit('categories/REQUEST_CATEGORIES_SUCCESS', data)
    } else {
      commit('categories/REQUEST_CATEGORIES_FAILURE')
    }
    // const data = (await )
  },
  /**
   * 新建 类别
   * @param commit
   * @param form
   * @returns {Promise<*>}
   */
  async newCategory ({commit}, {form}) {
    const {data} = await this.$axios.post(`/apps/${this.getters.appId}/categories/new`, form)
    if (data.errno > 0) {
      return data
    } else {
      commit('categories/NEW_CATEGORY_SUCCESS', data.data)
    }
  },
  /**
   * 更新 类别
   * @param commit
   * @param form
   * @returns {Promise<*>}
   */
  async updateCategory ({commit}, {form}) {
    const {data} = await this.$axios.post(`/apps/${this.getters.appId}/categories/slug:${form.slug}`, form)
    if (data.errno > 0) {
      return data
    } else {
      commit('categories/UPDATE_CATEGORY_SUCCESS', data.data)
      this.$toast.success('保存成功')
    }
  },
  /**
   * 删除 类别
   * @param commit
   * @param slug
   * @returns {Promise<*>}
   */
  async deleteCategory ({commit}, slug) {
    const {data} = await this.$axios.post(`/apps/${this.getters.appId}/categories/slug:${slug}/delete`)
    if (data.errno > 0) {
      return data
    } else {
      commit('categories/DELETE_CATEGORY_SUCCESS', data.data)
      this.$toast.success('删除成功')
    }
  },

  // -----------------------------
  // POST
  // -----------------------------
  async getPostDetail ({commit}, postId) {
    commit('post/REQUEST_DETAIL')
    const {data} = await this.$axios.get(`/apps/${this.getters.appId}/posts/${postId}`)
    if (data && data.errno === 0) {
      commit('post/GET_DETAIL_SUCCESS', data)
    } else {
      commit('posts/GET_DETAIL_FAILURE')
    }
  },
  async changePostAuthor ({commit}, form) {
    commit('post/UPDATE_DETAIL')
    const {data} = await this.$axios.post(`/apps/${this.getters.appId}/posts/${form.id}?action=change-author`, form)
    if (data && data.errno === 0) {
      commit('post/CHANGED_AUTHOR', form.data)
      this.$toast.success('作者更改成功')
    } else {
      this.$toast.error('作者更新失败')
    }
  },
  async savePostDetail ({commit}, {form}) {
    const newData = Object.assign({}, form)

    if (typeof form.author === 'object') {
      form.author = form.author.id
    } else {
      Reflect.deleteProperty(newData, 'author')
    }
    if (!Object.is(newData.block, undefined)) {
      Reflect.deleteProperty(newData, 'block')
    }
    commit('post/SAVE_DETAIL')
    const {data} = await this.$axios.post(`/apps/${this.getters.appId}/posts/${form.id}`, form)
    if (data && data.errno === 0) {
      commit('post/SAVE_DETAIL_SUCCESS', newData)
      this.$toast.success('内容保存成功')
    } else {
      commit('post/SAVE_DETAIL_FAILURE')
      this.$toast.error('内容保存失败')
    }
  },
  async createPost ({commit}, {form}) {
    commit('post/CREATE')
    const {data} = await this.$axios.post(`/apps/${this.getters.appId}/posts/new`, form)
    if (data.errno > 0) {
      commit('post/CREATE_FAILURE')
      this.$toast.error(data.data)

    } else {
      // const post = Object.assign(form, data.data)
      commit('post/CREATE_SUCCESS', data)
      history.pushState({state: 1}, 'Auto Save State', `/post/${data.data.id}`)
    }
    return data
  },
  //
  // BLOCKS
  //
  async removePostBlockItem ({commit}, item) {

  },
  async addPostBlock ({commit}, block) {

  },
  async sortPostBlock ({commit}, block) {
    // commit('post/SET_BLOCK', block)
  },
  // 更新并返回完整数据
  async updatePostDetail ({commit}, {form}) {
    commit('post/UPDATE_DETAIL')
    const {data} = await this.$axios.post(`/apps/${this.getters.appId}/posts/${form.id}?model=full`, form)
    if (data && data.errno === 0) {
      commit('post/UPDATE_DETAIL_SUCCESS', data)
    } else {
      commit('post/UPDATE_DETAIL_FAILURE')
    }
  },

  // -----------------------------
  // POST LIST
  // -----------------------------
  async getPostAssetList ({commit}, params) {
    commit('post/REQUEST_ASSET_LIST')
    const data = (await this.$axios.get(`/apps/${this.getters.appId}/posts/${params.id}/assets?format=${params.format}`)).data
    if (data && data.errno === 0) {
      const isFirstPage = params.page && params.page > 1
      const commitName = `post/${isFirstPage ? 'ADD' : 'GET'}_ASSET_LIST_SUCCESS`
      commit(commitName, data)
    } else {
      commit('post/GET_ASSET_LIST_FAILURE')
    }
  },

  async getPostsShortList ({commit}, category) {
    commit('posts/REQUEST_SHORT_LIST')
    const data = (await this.$axios.get(`/apps/${this.getters.appId}/posts?pagesize=6&category=${category}`)).data.data
    commit('posts/GET_SHORT_LIST', {category: category, data: data.data})
  },

  async getPostsFullList ({commit}, params = {page: 1}) {
    params.pagesize = 12
    commit('posts/REQUEST_FULL_LIST')
    const {data} = await this.$axios.get(`/apps/${this.getters.appId}/posts`, {params})
    if (data && data.errno === 0) {
      const isFirstPage = params.page && params.page > 1
      // ADD_FULL_LIST_SUCCESS
      const commitName = `posts/${isFirstPage ? 'ADD' : 'GET'}_FULL_LIST_SUCCESS`
      commit(commitName, data)
    } else {
      commit('posts/GET_FULL_LIST_FAILURE')
    }
  },

  // -----------------------------
  // USERS
  // -----------------------------
  async loadUsers ({commit}, params = {page: 1}) {
    commit('users/REQUEST_LIST')
    const {data} = await this.$axios.get(`/apps/${this.getters.appId}/users`, {params})
    if (data && data.errno === 0) {
      const isFirstPage = params.page && params.page > 1
      const commitName = `users/${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
      commit(commitName, data)
    } else {
      commit('users/GET_LIST_FAILURE')
    }
  },
  async addUser ({commit}, {form}) {
    commit('users/CREATE')
    try {
      const {data} = await this.$axios.post(`/apps/${this.getters.appId}/users`, form)
      if (data.errno > 0) {
        // 发送出错误状态
        commit('users/CREATE_FAILURE')
        return
      } else if (data.data.type === 'exist') {
        commit('users/CREATE_FAILURE_EXIST')
      } else {
        commit('users/CREATE_SUCCESS', data)
      }
      // setToken(data.data.token)
      // commit('SET_TOKEN', data.data.token)
      // commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },

  //
  // USER & ME
  //
  async getUser ({commit}, id) {
    commit('user/REQUEST_DETAIL')
    const data = (await this.$axios.get(`/apps/${this.getters.appId}/users/${id}`)).data
    if (data && data.errno === 0) {
      commit('user/GET_DETAIL_SUCCESS', data)
    } else {
      commit('user/GET_DETAIL_FAILURE')
    }
  },
  async updateUser ({commit}, {form}) {
    commit('user/UPDATE_DETAIL')
    const {data} = await this.$axios.post(`/apps/${this.getters.appId}/users/${form.id}`, form)
    if (data.errno > 0) {
      commit('users/UPDATE_FAILURE')
      this.$toast.error(data.data)
      return data
    } else {
      // commit('users/UPDATE_DETAIL', form)
      commit('user/UPDATE_SUCCESS', data.data)
    }
  },
  async updateMe ({commit}, {form}) {
    commit('users/UPDATE_DETAIL')
    const {data} = await this.$axios.post(`/apps/${this.getters.appId}/users/${form.id}`, form)
    if (data.errno > 0) {
      // commit('users/UPDATE_FAILURE')
    } else {
      // commit('users/UPDATE_DETAIL', form)
      // commit('users/UPDATE_SUCCESS')
    }
    return data
  }
}
// export default {
//   state: () => ({})
// }
