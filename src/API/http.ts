import axios from 'axios'
import {jwt, firebase} from '@/utils/token'
import store from '@/store'
import router from '@/router'

const FB_API_KEY = firebase.getApiToken()
const FB_AUTH_URL = firebase.getAuthURL()
const FB_DB_URL = firebase.getDatabaseURL()

const auth = axios.create({
  baseURL:`${FB_AUTH_URL}?key=${FB_API_KEY}`,
  headers: {
    "Content-Type": " application/json"
  }
})

const data = axios.create({
  baseURL: FB_DB_URL,
  params: {
    auth: jwt.getToken()
  },
  headers: {
    "Content-Type": " application/json"
  }
})


auth.interceptors.request.use(config => {
  console.log(config, 'CONFIG')
  return config
})

data.interceptors.response.use(config => {
  return config
}, async error => {
  if (error.response.status === 401) {
    await router.push('/auth?message=notAuth')
  }
  return Promise.reject(error)
})

export default {
  auth,
  data
}