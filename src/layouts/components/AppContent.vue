<template>
  <div class="container with-nav">
    <AppMessage />
    <router-view />
  </div>
</template>

<script>
import AppMessage from '@/components/messages/NotifyMessage'
export default {
	components: {AppMessage},
	name: "AppContent",
}
</script>

<style scoped>

</style>