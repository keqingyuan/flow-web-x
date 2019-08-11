import http from '../http'
import md5 from 'blueimp-md5'
import jwtDecode from 'jwt-decode'
import moment from 'moment'
import code from '@/util/code'
import { errorCommit } from '../index'

const state = {
  // raw token
  token: null,

  refreshToken: null,

  // decoded from token
  user: {},

  hasLogin: false
}

const reset = (state) => {
  state.user = {}
  state.token = null
  state.refreshToken = null
  state.hasLogin = false

  http.setTokens('', '')

  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
}

const mutations = {
  set (state, {token, refreshToken}) {
    state.token = token
    state.refreshToken = refreshToken

    http.setTokens(token, refreshToken)
  },

  save (state, {token, refreshToken}) {
    try {
      var decoded = jwtDecode(token)
    } catch (error) {
      return
    }

    state.user = {
      email: decoded.jti,
      role: decoded.role,
      issueAt: moment.unix(decoded.iat),
      expireAt: moment.unix(decoded.exp)
    }
    state.token = token
    state.refreshToken = refreshToken
    state.hasLogin = true

    http.setTokens(token, refreshToken)

    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
  },

  clean (state) {
    reset(state)
  }
}

const actions = {
  async login ({commit}, {username, password}) {
    let passwordOnMd5 = md5(password, null, false)
    let content = btoa(username + ':' + passwordOnMd5)

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + content
      }
    }

    const onSuccess = (tokens) => {
      commit('save', tokens)
    }

    await http.post('auth/login', onSuccess, null, config)
  },

  async logout ({commit}) {
    const onSuccess = () => {
      commit('clean')
    }
    await http.post('auth/logout', onSuccess())
  },

  // load from storage
  async load ({commit}) {
    let token = localStorage.getItem('token')
    let refreshToken = localStorage.getItem('refreshToken')

    // throw error if token not exist
    if (!token || !refreshToken) {
      errorCommit(code.error.auth, 'token not found')
      throw {}
    }

    // throw error if token invalid
    let decoded
    try {
      decoded = jwtDecode(token)
    } catch (e) {
      errorCommit(code.error.auth, 'Invalid token')
      throw {}
    }

    commit('set', {token, refreshToken})
  }
}

export const Store = {
  namespaced: true,
  state,
  mutations,
  actions
}
