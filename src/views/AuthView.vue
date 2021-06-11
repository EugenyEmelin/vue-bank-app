<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Войти в систему</h1>
    <div class="form-control" :class="{invalid: emailError}">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="emailBlur">
      <small v-if="emailError">{{ emailError }}</small>
    </div>
    <div class="form-control" :class="{invalid: passwordError}">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="passwordBlur">
      <small v-if="passwordError">{{ passwordError }}</small>
    </div>
    <button class="btn primary" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <div class="text-danger" v-if="isTooManyAttempts">Превышен лимит попыток на вход</div>
  </form>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {useLoginForm} from '@/hooks/login-form'
import { useRoute } from 'vue-router'
import {useStore} from "vuex";
import {parseErrorCode} from "@/utils/errorHandler";


export default defineComponent({
  name: 'ComponentName',

  setup() {
    const route = useRoute()
    const store = useStore()

    if (route.query.message) {
      const message = route.query.message.toString()

      store.dispatch('alerts/setMessage', {
        value: parseErrorCode(message),
        type: 'warning'
      })
    }

    return {
      ...useLoginForm()
    }
  }
})
</script>

<style scoped>

</style>