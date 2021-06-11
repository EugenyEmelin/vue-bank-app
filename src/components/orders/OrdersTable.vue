<template>
  <AppTable
      :key="componentKey"
      :columns="columns"
      :data="orders"
      table-class="table"
      :loading="loading"
      filterable
  >
    <template #actionButton>
      <button class="btn primary">Open</button>
    </template>
  </AppTable>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref } from 'vue'
import AppTable from '@/components/App/AppTable.vue'
import { useStore } from 'vuex'
import Loader from '@/components/UI/Loader.vue'
import { TableColumnOptions } from '@/Types/app-components'

export default defineComponent({
  name: 'OrdersTable',
  components: {
    AppTable, Loader
  },

  setup() {
    const columns: TableColumnOptions[] = [
      {
        key: 'fullName',
        name: 'Full name',
        searchable: true,
      },
      {
        key: 'phone',
        name: 'Phone'
      },
      {
        key: 'amount',
        name: 'Amount',
        valueType: 'currency'
      },
      {
        key: 'status',
        name: 'Status',
        useLabel: true,
        selectable: true
      },
      {
        key: 'action',
        name: '',
        routerLink: {
          to: {
            name: 'Order',
            params: [
              {key: 'id', property: 'id'}
            ]
          }
        }
      }
    ]

    const loading = ref(false)
    const store = useStore()
    let componentKey = ref(1)

    const orders = computed(() => store.getters['orders/getOrders'])

    onMounted(async () => {
      loading.value = true
      await store.dispatch('orders/loadOrders')
      loading.value = false
      componentKey.value += 1
    })

    return {
      columns, loading, orders, componentKey
    }
  }
})
</script>

<style scoped>

</style>