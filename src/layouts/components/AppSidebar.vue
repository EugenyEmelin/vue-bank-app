<template>
  <div class="sidebar" v-if="sidebar">
    <span class="sidebar-close" @click="closeSidebar">&times;</span>
    <div class="sidebar-content">
      <p>Welcome to the registration system of applications in our bank.</p>
      <p>Here you will find comprehensive information on issues of interest.</p>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ComponentName',

  setup() {
    const store = useStore()
    const sidebar = computed(() => store.state.sidebar)
    const closeSidebar = () => store.commit('closeSidebar')

    return {
      sidebar, closeSidebar
    }
  }
})
</script>

<style scoped>

</style>