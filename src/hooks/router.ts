import {computed} from 'vue'
import {useRoute} from 'vue-router'

export function getPageLayout() {
  const route = useRoute()
  return computed(() => route.meta.layout)
}