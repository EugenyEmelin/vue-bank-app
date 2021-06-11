import {AuthState, RootState, StoreAlert} from "@/Types/vuex"
import {ActionTree, GetterTree, MutationTree} from 'vuex'
import {M} from '@/store/mutations.list'
import NAMES from '@/utils/entities.names'
import API from '@/API'
import {dispatchError, parseErrorCode} from "@/utils/errorHandler"

const tokenName = NAMES.JWT_TOKEN_NAME

// State
const state = (): AuthState => ({
  token: localStorage.getItem(tokenName)
})

// Getters
const getters: GetterTree<AuthState, RootState> = {
  token(state) {
    return state.token
  },
  isAuthenticated(state): boolean {
    return !!state.token
  }
}

// Mutations
const mutations: MutationTree<AuthState> = {
  [M.SET_TOKEN](state, token) {
    state.token = token
    localStorage.setItem(tokenName, token)
  },
  [M.LOGOUT](state) {
    state.token = null
    localStorage.removeItem(tokenName)
  }
}

// Actions
const actions: ActionTree<AuthState, RootState> = {
  async login({commit, dispatch}, payload: AuthPayload) {
    const response = await API.Auth.login(payload)
    console.log(response, 'response')

    if (response.status === 200) {
      commit(M.SET_TOKEN, response.data.idToken)
      console.log(response.data.idToken)
    } else {
      await dispatchError(response)
    }

    return response
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}