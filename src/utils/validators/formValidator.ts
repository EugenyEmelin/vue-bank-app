import * as yup from 'yup'

const PWD_LEN = 6

export default {
  email:
    yup
      .string()
      .trim()
      .required('Введите email')
      .email(),

  password:
    yup
      .string()
      .trim()
      .required('Введите пароль')
      .min(PWD_LEN, `Пароль должен содержать ${PWD_LEN} или более символов`),

  fullName:
    yup
      .string()
      .trim()
      .min(5, 'Нужно 5 или более символов')
      .required('Введите Ф.И.О.'),

  phone:
    yup
      .string()
      .trim()
      .required('Для оформления заявки нужен телефон'),

  amount:
    yup
      .number()
      .typeError('Введите сумму')
      .required('Введите сумму')
      .min(0, 'Сумма не может быть меньше нуля')

}