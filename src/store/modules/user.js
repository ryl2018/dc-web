import {register, login, logout, isExistByUserPhone, restPassword} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
  },

  actions: {
    //注册
    Register({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        register(userInfo.phone, userInfo.password).then(response => {
          const data = response
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.phone.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //检测该手机号是否已经注册
    IsExistByUserPhone({commot}, phone) {
      return new Promise((resolve, reject) => {
        isExistByUserPhone(phone).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    RestPassword({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        restPassword(userInfo.phone, userInfo.password).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default user
