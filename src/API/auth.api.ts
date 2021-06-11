import http from './http'
import {catchable} from "@/utils/decorators/catchable.decorator"
import {databaseErrorHandler} from "@/utils/errorHandler"

export class Auth {
  @catchable(databaseErrorHandler)
  static async login(payload: AuthPayload) {
    return await http.auth.post('', {...payload, returnSecureToken: true})
  }

  @catchable(databaseErrorHandler)
  static async register(payload: {}) {

  }
}
