import Vuex from 'vuex'
import auth from './modules/auth'
import { extractFromReq } from '~/utils/cookie'

export default () => new Vuex.Store({
  modules: {
    auth
  },

  actions: {
    /**
     * Initialize the application in the server.
     */
    async nuxtServerInit ({ dispatch }, { req }) {
      // Get cookie data from the request.
      let cookie = extractFromReq(req)

      // Initialize auth if the access_token exist in the
      // cookie
      if (cookie.access_token) {
        await dispatch('initAuth', cookie.access_token)
      }
    }
  }
})
