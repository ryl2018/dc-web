import {register, login, logout, isExistByUserPhone, restPassword} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    phone: '未登陆'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
  },

  actions: {
    //注册
    Register({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        register(userInfo.phone, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_PHONE', data.phone)
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
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_PHONE', data.phone)
          resolve(response)
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
        logout().then((resp) => {
          commit('SET_TOKEN', '')
          commit('SET_PHONE', '未登陆')
          removeToken()
          resolve(resp)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_PHONE', '未登陆')
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
