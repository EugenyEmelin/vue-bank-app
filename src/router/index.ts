import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import HomePage from "@/views/HomeView.vue"
import store from '@/store'
import names from '@/utils/entities.names'
import {authRoute} from '@/router/modules/auth.route'
import {ordersRoute} from '@/router/modules/orders.route'
import {AppRoute} from "@/Types/router";

const routes: AppRoute[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      layout: 'app-layout',
      showInSidebar: true,
      icon: 'home-icon',
      auth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('@/views/HelpView.vue'),
    meta: {
      layout: 'app-layout',
      auth: true
    }
  },
  // Include other routes
  ...authRoute,
  ...ordersRoute
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.meta.auth
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (requireAuth && !isAuthenticated) {
    next(`/auth?message=${names.NO_AUTH_CODE}`)
  } else {
    next()
  }
})

export default router
