<template>
  <ContentWrapper title="Support">
    <QuestionItem
      v-for="question in questions"
      :key="question.title"
      :question="question"
    />
  </ContentWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContentWrapper from '@/components/ContentWrapper.vue'
import QuestionItem from "@/components/question/QuestionItem.vue";

export default defineComponent({
  name: 'ComponentName',
  components: {
    ContentWrapper, QuestionItem
  },

  setup() {
    const questions = [
      {
        title: 'Что есть в данной системе?',
        answer: 'Тут есть вся информация, касающаяся заявок. Можно смотреть как список, так и отдельно каждую заявку'
      },
      {
        title: 'Как тут работает авторизация?',
        answer: 'Все реализовано через Google Firebase'
      }
    ]

    return {
      questions
    }
  }
})
</script>

<style scoped>

</style>