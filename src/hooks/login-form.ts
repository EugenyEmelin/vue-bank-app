import {useField, useForm} from "vee-validate"
import formValidator from "@/utils/validators/formValidator"
import {computed, watch} from "vue"
import {useStore} from "vuex"
import {useRouter} from "vue-router"

export function useLoginForm() {
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting, submitCount} = useForm()

  // email field
  const {
    value: email,
    errorMessage: emailError,
    handleBlur: emailBlur
  } = useField('email', formValidator.email)

  // password field
  const {
    value: password,
    errorMessage: passwordError,
    handleBlur: passwordBlur
  } = useField('password', formValidator.password)

  const isTooManyAttempts = computed(() => submitCount.value > 3)

  watch(isTooManyAttempts, value => {
    if (value) {
      setTimeout(() => submitCount.value = 0, 1500)
    }
  })

  // button handler
  const onSubmit = handleSubmit(async values => {
    const result = await store.dispatch('auth/login', values)
    if (result.status === 200) await router.push('/')
  })

  return {
    email, emailError, emailBlur,
    password, passwordError, passwordBlur,
    onSubmit, isSubmitting, isTooManyAttempts
  }
}