import names from './entities.names'
const jwtName = names.JWT_TOKEN_NAME

export const jwt = {
  getToken() {
    return localStorage.getItem(jwtName)
  },
  setToken(token: string) {
    localStorage.setItem(jwtName, token)
  },
  removeToken() {
    localStorage.removeItem(jwtName)
  },
}

export const firebase = {
  getApiToken() {
    return process.env.VUE_APP_FIREBASE_API_KEY
  },
  getAuthURL() {
    return process.env.VUE_APP_FIREBASE_AUTH_URL
  },
  getDatabaseURL() {
    return process.env.VUE_APP_FIREBASE_REALTIME_DB_URL
  }
}