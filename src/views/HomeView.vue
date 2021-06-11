<template>
  <ContentWrapper  title="List of orders">
    <template #header>
      <button class="btn primary" @click="openModal">Create</button>
    </template>
    <OrdersTable/>
    <AppModal
        title="Create order"
        @close="closeModal"
        :show="modal"
    >
      <OrdersForm @created="modal = false"/>
    </AppModal>
  </ContentWrapper>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import ContentWrapper from '@/components/ContentWrapper.vue'
import OrdersTable from "@/components/orders/OrdersTable.vue"
import AppModal from '@/components/App/AppModal.vue'
import OrdersForm from '@/components/orders/OrderForm.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    ContentWrapper,
    OrdersTable,
    AppModal,
    OrdersForm
  },

  setup() {
    const modal = ref(false)
    const closeModal = () => modal.value = false
    const openModal = () => modal.value = true

    return {
      modal, closeModal, openModal
    }
  }
})
</script>

<style scoped>

</style>