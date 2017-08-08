import axios from 'axios'

export default ({ store }) => {
  axios.defaults.baseURL = 'http://test-api.dev/'

  axios.interceptors.request.use(config => {
    if (store.state.auth.accessToken) {
      config.headers['Authorization'] = 'Bearer ' + store.state.auth.accessToken
    }

    return config
  })
}
