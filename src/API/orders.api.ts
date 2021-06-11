import http from './http'
import {catchable} from "@/utils/decorators/catchable.decorator"
import {databaseErrorHandler} from "@/utils/errorHandler"
import store from '@/store'

export class Orders {
  @catchable(databaseErrorHandler)
  static async create(order: OrderPayload) {
    return http.data({
      method: 'POST',
      url: '/requests.json',
      data: order
    })
  }

  @catchable(databaseErrorHandler)
  static async load() {
    return await http.data.get('/requests.json')
  }

  @catchable(databaseErrorHandler)
  static async loadOne(id: string) {
    return http.data({
      method: 'GET',
      url: `/requests/${id}.json`,
    })
  }

  @catchable(databaseErrorHandler)
  static async remove(id: string) {
    return http.data({
      method: 'DELETE',
      url: `/requests/${id}.json`,
    })
  }

  @catchable(databaseErrorHandler)
  static async update(order: Order) {
    return http.data({
      method: 'PUT',
      url: `/requests/${order.id}.json`,
      data: order
    })
  }
}