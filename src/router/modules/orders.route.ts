import {AppRoute} from "@/Types/router"

export const ordersRoute: AppRoute[] = [
  {
    path: '/order/:id',
    name: 'Order',
    component: () => import('@/views/OrderView.vue'),
    meta: {
      layout: 'app-layout'
    }
  }
]