<template>
  <div class="card">
    <div class="card-title">
      <div class="header-breadcrumbs" v-if="back">
        <router-link to="/"><span class="breadcrumbs-back-icon">&#8249;</span> Back to orders</router-link>
      </div>
      <h2>{{title}}</h2>
      <slot name="header"></slot>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ContentWrapper',
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    document.title = `${props.title} | Online Bank`

    return {

    }
  }
})
</script>

<style scoped>

</style>