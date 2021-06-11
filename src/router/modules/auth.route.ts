import {AppRoute} from "@/Types/router"

export const authRoute: AppRoute[] = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/AuthView.vue'),
    meta: {
      layout: 'auth-layout'
    }
  }
]