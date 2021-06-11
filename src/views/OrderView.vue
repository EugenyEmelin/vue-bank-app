<template>
  <ContentWrapper title="Order" back>
    <Loader v-if="loading" />
    <div class="order" v-else-if="order">
      <p><strong>Full name:</strong> {{order.fullName}}</p>
      <p><strong>Phone:</strong> {{order.phone}}</p>
      <p><strong>Amount:</strong> {{Formatter.currency(order.amount)}}</p>
      <p><strong>Status:</strong> <StatusLabel :type="order.status"/></p>

      <div class="order-changers">
        <div class="form-control">
          <label for="status">Status</label>
          <select id="status" v-model="status">
            <option value="done">Done</option>
            <option value="cancelled">Cancelled</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      <div class="order-actions">
        <button class="btn danger" @click.prevent="removeOrder">Delete</button>
        <button v-if="hasChanges" class="btn" @click.prevent="updateOrder">Update</button>
      </div>
    </div>
    <h3 v-else>
      Order {{orderId}} is not found
    </h3>
  </ContentWrapper>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, Ref, ref } from 'vue'
import ContentWrapper from '@/components/ContentWrapper.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Loader from '@/components/UI/Loader.vue'
import {Formatter} from "@/utils/formatter"
import StatusLabel from "@/components/UI/StatusLabel.vue";

export default defineComponent({
  name: 'ComponentName',
  components: {
    ContentWrapper, Loader, StatusLabel
  },

  setup() {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const loading = ref(true)
    const orderId = route.params.id
    const status = ref()

    const order = ref({} as Order)

    onMounted(async () => {
      loading.value = true
      order.value = await store.dispatch('orders/loadOne', orderId)
      status.value = order.value.status
      loading.value = false
    })

    const hasChanges = computed(() => order.value.status !== status.value)

    const removeOrder = async () => {
      await store.dispatch('orders/remove', route.params.id)
      await router.push('/')
    }

    const updateOrder = async () => {
      const updatedOrder = {...order.value, status: status.value}
      await store.dispatch('orders/update', updatedOrder)
      order.value.status = status.value
    }

    return {
      loading,
      order, status, orderId,
      Formatter,
      removeOrder, updateOrder,
      hasChanges
    }
  }
})
</script>

<style scoped>

</style>