<template>
  <teleport to="body">
    <div class="modal-wrapper" v-if="show">
      <div class="modal-backdrop" @click="$emit('close')"></div>
      <div class="modal">
        <h3 v-if="title">{{title}}</h3>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['close'],
  name: 'AppModal',
  props: {
    title: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    }
  },

  setup() {

    return {

    }
  }
})
</script>

<style scoped>

</style>