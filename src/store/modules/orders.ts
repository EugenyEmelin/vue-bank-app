import {OrdersState, RootState, StoreAlert} from "@/Types/vuex"
import {ActionTree, GetterTree, MutationTree} from "vuex"
import {M} from "@/store/mutations.list"
import API from '@/API'
import {dispatchError} from "@/utils/errorHandler";
import {Data} from "@/Types/app-components";


const state = (): OrdersState => ({
  orders: []
})

const getters: GetterTree<OrdersState, RootState> = {
  getOrders(state) {
    return state.orders
  }
}

const mutations: MutationTree<OrdersState> = {
  [M.SET_ORDERS](state, orders) {
    state.orders = orders
  },
  [M.ADD_ORDER](state, order) {
    state.orders.push(order)
  }
}

const actions: ActionTree<OrdersState, RootState> = {
  async createOrder({commit, dispatch}, order) {
    const response = await API.Orders.create(order)

    if (response.status === 200) {
      commit(M.ADD_ORDER, {...order, id: response.data.name})

      const createdMessage: StoreAlert = {
        value: 'Order successfully created',
        type: 'primary'
      }
      dispatch('alerts/setMessage', createdMessage, {root: true})
    } else {
      await dispatchError(response)
    }
  },

  async loadOrders({commit}) {
    const response = await API.Orders.load()

    if (response && response.status === 200) {
      const data: Data = response.data || {}
      const orders = Object.entries(data).map(([id, order]) => {
        order.id = id
        return order
      })

      commit(M.SET_ORDERS, orders)
    }
  },


  async loadOne({commit, dispatch}, id): Promise<Order | undefined> {
    const response = await API.Orders.loadOne(id)
    if (response && response?.status === 200) {
      const order = response.data
      order.id = id
      return order
    }
  },

  async remove({commit, dispatch}, id) {
    const response = await API.Orders.remove(id)
    if (response?.status === 200) {
      dispatch('alerts/setMessage', {
        value: 'Order has been deleted',
        type: 'primary'
      }, {root: true})
      return response.data
    }
  },

  async update({commit, dispatch}, order) {
    const response = await API.Orders.update(order)
    if (response?.status === 200) {
      dispatch('alerts/setMessage', {
        value: 'Order has been updated',
        type: 'primary'
      }, {root: true})
      return response.data
    }
  },
}

export default {
  namespaced: true,
  state, getters, mutations, actions
}