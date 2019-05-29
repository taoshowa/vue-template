import { loginByUsername, logout } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    id: '',
    name: '',
    status: '',
    token: getToken(),
    avatar: '',
    roles: [],
    setting: {}
  },

  mutations: {
    SET_CODE: (state, id) => {
      state.id = id
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data.data
          if (data && data.token) {
            commit('SET_CODE', data.id)
            commit('SET_NAME', data.username)
            commit('SET_AVATAR', data.avatar)
            commit('SET_TOKEN', data.token)
            setToken(data.token)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // // 获取用户信息
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(state.token).then(response => {
    //       if (!response.data) {
    //         reject('error')
    //       }
    //       const data = response.data.data

    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }

    //       commit('SET_CODE', data.id)
    //       commit('SET_NAME', data.username)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response.data)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          removeToken()
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        resolve()
      })
    }

  }
}

export default user
