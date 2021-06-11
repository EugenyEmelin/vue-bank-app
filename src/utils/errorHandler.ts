import {ErrorResponseData} from "@/Types/errors"
import names from '@/utils/entities.names'
import {StoreAlert} from "@/Types/vuex"
import store from '@/store'

interface ErrorCodes {
  [key: string]: string
}

const ERROR_CODES: ErrorCodes = {
  EMAIL_NOT_FOUND: 'User with this email was not found',
  INVALID_PASSWORD: 'Invalid email or password',
  [names.NO_AUTH_CODE]: 'You are not logged in'
}

function errorMessage(code: string): string {
  return ERROR_CODES[code] ?? 'Unknown error'
}

export function parseErrorCode(error: string) {
  return errorMessage(error)
}


export function databaseErrorHandler(error: ErrorResponseData) {
  const errCode = error?.data?.error?.message
  console.log('Database Error: ', errCode)
  return error
}

export async function dispatchError(response: ErrorResponseData) {
  const errorMessage: StoreAlert = {
    value: parseErrorCode(response.data.error.message),
    type: 'danger'
  }
  await store.dispatch('alerts/setMessage', errorMessage, {root: true})
}