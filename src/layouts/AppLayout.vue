<template>
  <AppNavbar />
  <AppSidebar />
  <AppContent />
</template>

<script>
import AppNavbar  from './components/AppNavbar'
import AppContent from "./components/AppContent"
import AppSidebar from './components/AppSidebar'

export default {
  name: 'AppLayout',
  components: {
	  AppContent, AppNavbar, AppSidebar
  }
}
</script>

<style scoped></style>
