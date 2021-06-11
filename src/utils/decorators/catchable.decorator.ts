/**
 * @param errorMessage Сообщения об ошибке
 * @returns Новая функция обернутая в try/catch с обработчиком ошибок сервера
 */
import {ErrorHandlerFunction, ErrorResponse} from "@/Types/errors";

// decorator factory function
export const catchable = (handler: ErrorHandlerFunction): any => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // save a reference to the original method
    const originalMethod = descriptor.value

    // rewrite original method with custom wrapper
    descriptor.value = async function(...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args)

        // return actual result
        return Promise
          .resolve(result)
          .catch((error: ErrorResponse) => handler(error.response))
      } catch (error) {
        handler(error.response)
      }
    }

    return descriptor
  }
}