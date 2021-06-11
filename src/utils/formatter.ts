const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  currency: 'RUB',
  style: 'currency'
})

export const Formatter = {
  currency(value: number) {
    return currencyFormatter.format(value)
  }
}