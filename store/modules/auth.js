import axios from 'axios'
import Cookie from 'js-cookie'
import * as types from './../mutation-types'

const state = {
  accessToken: null,
  user: null
}

const getters = {
  /**
   * Determine if the user is logged in the app.
   */
  loggedIn (state) {
    return state.user != null
  }
}

const actions = {
  /**
   * Login into the app.
   */
  login ({ commit }, credential) {
    return new Promise(async (resolve, reject) => {
      try {
        // Request a token from the server.
        let token = await axios.post('/oauth/token', {
          grant_type: 'password',
          client_id: '2',
          client_secret: 'lbQinQL5a8flcQYEC0UfNbrw8ZnbpibhBJYjooXw',
          ...credential
        })

        // Store the token in the store and cookie.
        Cookie.set('access_token', token.data.access_token)
        commit(types.SET_ACCESS_TOKEN, token.data.access_token)

        // Fetch the current user data.
        let user = await axios.get('/api/user')
        commit(types.SET_USER, user.data)
        resolve(user.data)
      } catch (error) {
        reject(error)
      }
    })
  },

  /**
   * Logout from the application.
   */
  logout ({ commit }) {
    Cookie.remove('access_token')
    commit(types.UNSET_AUTH)
  },

  /**
   * Init auth for the request.
   */
  initAuth ({ commit }, accessToken) {
    commit(types.SET_ACCESS_TOKEN, accessToken)

    return axios.get('/api/user')
      .then(response => commit(types.SET_USER, response.data))
  }
}

const mutations = {
  [types.SET_USER] (state, user) {
    state.user = user
  },

  [types.SET_ACCESS_TOKEN] (state, token) {
    state.accessToken = token
  },

  [types.UNSET_AUTH] (state) {
    state.accessToken = null
    state.user = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
