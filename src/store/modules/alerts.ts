import {ActionTree, GetterTree, MutationTree} from "vuex"
import {ErrorsState, RootState, StoreAlert} from "@/Types/vuex"
import {M} from '@/store/mutations.list'

const state = (): ErrorsState => ({
  message: null
})

const getters: GetterTree<ErrorsState, RootState> = {
  getErrorMessage(state): StoreAlert | null {
    return state.message
  }
}

const mutations: MutationTree<ErrorsState> = {
  [M.SET_MESSAGE](state, message: StoreAlert) {
    state.message = message
  },
  [M.CLEAR_MESSAGE](state) {
    state.message = null
  }
}

const actions: ActionTree<ErrorsState, RootState> = {
  setMessage({commit}, message) {
    commit(M.SET_MESSAGE, message)
    setTimeout(() => {
      commit(M.CLEAR_MESSAGE)
    }, 8000)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}