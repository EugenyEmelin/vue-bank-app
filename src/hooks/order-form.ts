import {SubmissionHandler, useField, useForm} from "vee-validate"
import validator from '@/utils/validators/formValidator'

export function useOrderForm(fn: SubmissionHandler<{status: string}>) {
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      status: 'active'
    }
  })

  const {
    value: fullName,
    errorMessage: nameError,
    handleBlur: nameBlur
  } = useField('fullName', validator.fullName)

  const {
    value: phone,
    errorMessage: phoneError,
    handleBlur: phoneBlur
  } = useField('phone', validator.phone)

  const {
    value: amount,
    errorMessage: amountError,
    handleBlur: amountBlur
  } = useField('amount', validator.amount)

  const {
    value: status
  } = useField('status')

  const onSubmit = handleSubmit(fn)

  return {
    fullName, nameError, nameBlur,
    phone, phoneError, phoneBlur,
    amount, amountError, amountBlur,
    status,
    isSubmitting, onSubmit
  }
}