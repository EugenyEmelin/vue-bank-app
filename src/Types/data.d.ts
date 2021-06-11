declare interface AuthPayload {
  password: string
  email: string
  phone?: number | string
}

declare interface RegisterPayload {
  login: string
  password: string
  email: string
}

declare type OrderStatus = 'done' | 'pending' | 'canceled' | 'success'

declare interface OrderPayload {
  fullName: string
  amount: number
  phone: string
  status: OrderStatus
}

declare interface Order extends OrderPayload{
  id: string
}

declare type Question = {
  title: string
  answer: string
}
