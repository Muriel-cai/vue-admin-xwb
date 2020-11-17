import { login, logout, getInfo, getLoginUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const data = response
        commit('SET_TOKEN', data.accessToken)
        setToken(data.accessToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // console.log(response.resMsg, 'getInfo')
        const {
          data
        } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).then(getLoginUserInfo().then(res => {
        console.log(res.data.nickName, 'getInfo')
        // const { name } = res.data.nickName
        commit('SET_NAME', res.data.nickName)
      }))
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      // console.log(state.token, 'zhes')
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        commit('SET_NAME', '')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    // console.log(commit, ' 这是user.js 下的清除TOKEN')
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      // commit('SET_ROLES', [])
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

