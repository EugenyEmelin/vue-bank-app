<template>
  <component :is="pageLayout" v-if="pageLayout"/>
</template>

<script lang="ts">
import {getPageLayout} from '@/hooks/router'
import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import {defineComponent} from 'vue'


export default defineComponent({
  setup() {

    return {
      pageLayout: getPageLayout()
    }
  },
  components: {
    AppLayout,
    AuthLayout
  }
})
</script>
