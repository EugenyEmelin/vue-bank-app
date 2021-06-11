<template>
  <div class="question" @click="isOpen = !isOpen">
    <div class="question-title">
      <span class="open-label" :class="{isOpen: isOpen}">&#9660;</span>
      {{question.title}}
    </div>
    <div class="question-body" v-if="isOpen">
      {{question.answer}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'ComponentName',
  props: {
    question: {
      type: Object as PropType<Question>
    }
  },

  setup() {
    const isOpen = ref(false)

    return {
      isOpen
    }
  }
})
</script>

<style scoped>

</style>