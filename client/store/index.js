
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

// global actions
export const actions = {
  // 全局服务初始化
  async nuxtServerInit (store, {app, req}) {
    if (!Object.is(req.session.__org, undefined)) {
      await store.commit('org/SET_ORG_DETAIL', req.session.__org)
    }
    // await store.commit('org/SET_CURRENT_APP', req.session.__org.apps[0])
  },
  async nuxtClientInit({ commit }, context) {
  },

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

  async updateOption ({commit}) {

  },
  // CATEGORYS
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
  //
  // POSTS
  //
  async getPostsShortList ({commit}, category) {
    commit('posts/REQUEST_CATEGORY_LIST', category)
    const data = (await this.$axios.get(`/apps/${this.getters.appId}/posts?pagesize=6&category=${category}`)).data.data
    commit('posts/GET_SHORT_LIST', {category: category, data: data.data})
  },
  async getPostsFullList ({commit}, category) {
    commit('posts/REQUEST_CATEGORY_LIST', category)
    const data = (await this.$axios.get(`/apps/${this.getters.appId}/posts?pagesize=20&category=${category}&status=auto-draft`)).data.data
    commit('posts/GET_FULL_LIST', {category: category, data: data.data})
  },

  // USERS
  async loadUsers ({commit}, params = {page: 1}) {
    console.log('load users...')
    commit('users/REQUEST_LIST')
    const {data} = await this.$axios.get(`/apps/${this.getters.appId}/users`, {params})
    // console.warn(data)
    if (data && data.errno === 0) {
      const isFirstPage = params.page && params.page > 1
      const commitName = `users/${isFirstPage ? 'ADD' : 'GET'}_LIST_SUCCESS`
      commit(commitName, data)
    } else {
      commit('users/GET_LIST_FAILURE')
    }
  },
  async getUser ({commit}, id) {
    commit('users/REQUEST_DETAIL')
    const data = (await this.$axios.get(`/apps/${this.getters.appId}/users/${id}`)).data
    if (data && data.errno === 0) {
      commit('users/GET_DETAIL_SUCCESS', data)
    } else {
      commit('users/GET_DETAIL_FAILURE')
    }
  },
  async updateUser ({commit}, {form}) {
    commit('users/UPDATE_DETAIL')
    const {data} = await this.$axios.post(`/apps/${this.getters.appId}/users/${form.id}`, form)
    if (data.errno > 0) {
      // commit('users/UPDATE_FAILURE')
    } else {
      // commit('users/UPDATE_DETAIL', form)
      // commit('users/UPDATE_SUCCESS')
    }
    return data
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
  }
}
// export default {
//   state: () => ({})
// }
