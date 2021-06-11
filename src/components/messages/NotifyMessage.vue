<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert-title">{{title}}</p>
    <p>{{message.value}}</p>
    <span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent } from 'vue'
import { useStore } from 'vuex'
import {StoreAlert} from "@/Types/vuex"
import {M} from '@/store/mutations.list'

export default defineComponent({
  name: 'ComponentName',

  setup() {
    const store = useStore()
    const TITLE_MAP = {
      primary: 'Success!',
      danger: 'Error!',
      warning: 'Warning!'
    }

    const message: ComputedRef<StoreAlert> = computed(() => store.getters['alerts/getErrorMessage'])
    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null)

    const close = () => store.commit(`alerts/${M.CLEAR_MESSAGE}`)

    return {
      message,
      title,
      close
    }
  }
})
</script>

<style scoped>

</style>