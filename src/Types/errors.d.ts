import {AxiosError, AxiosResponse} from "axios";

declare type ErrorResponse = {
  response: {
    data: {
      error: {
        code: number,
        message: string
      }
    }
  }
}

declare type ErrorResponseData = {
  data: {
    error: {
      code: number,
      message: string
    }
  }
}

declare type ErrorHandlerFunction = (error: ErrorResponseData) => any