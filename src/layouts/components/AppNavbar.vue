<template>
  <nav class="navbar">
    <h3>Online Bank</h3>
    <ul class="navbar-menu">
      <li v-for="(item, i) in navbarItems" :key="item.title + i">
        <router-link :to="item.path">{{ item.title }}</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="openSidebar">Messages</a>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Exit</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import {M} from '@/store/mutations.list'

type NavbarItem = {
  path: string
  title: string
}
export default defineComponent({
  name: 'AppNavbar',
  setup() {
    const router = useRouter()
    const store = useStore()
    const logout = () => {
      store.commit(`auth/${M.LOGOUT}`)
      router.push('/auth')
    }

    const openSidebar = () => store.commit('openSidebar')

    const navbarItems: NavbarItem[] = [
      {
        path: '/',
        title: 'Orders'
      },
      {
        path: '/help',
        title: 'Support'
      },
    ]
    return {
      navbarItems,
      logout,
      openSidebar
    }
  }
})
</script>

<style scoped></style>
