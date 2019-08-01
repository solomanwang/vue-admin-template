import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { stat } from 'fs';

const state = {
  token: getToken(),
  name: ''
  // avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { name, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ name: name.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        console.log("出现错误 = ", error);
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('验证过期, 请重新登录.')
        }
        const { name} = data
        commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        console.log("获取userinfo错误 ： ",error);
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   removeToken()
      //   resetRouter()
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

