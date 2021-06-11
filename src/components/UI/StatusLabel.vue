<template>
  <span :class="['badge', className]">{{text}}</span>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

type StringList = {[key: string]: string}

const defaultClassMap: StringList = {
  active: 'primary',
  cancelled: 'danger',
  done: 'done',
  pending: 'pending'
}
const defaultTextMap: StringList = {
  active: 'active',
  cancelled: 'cancelled',
  done: 'done',
  pending: 'pending'
}

export default defineComponent({
  name: 'ComponentName',
  props: {
    classMap: {
      type: Object as PropType<StringList>,
      default: defaultClassMap
    },
    textMap: {
      type: Object as PropType<StringList>,
      default: defaultTextMap
    },
    type: {
      type: String,
      required: true,
    }
  },

  setup(props) {
    const type = props.type
    const classMap = props.classMap ?? defaultClassMap
    const textMap = props.textMap ?? defaultTextMap

    const className = ref(classMap[type])
    const text = ref(textMap[type])

    watch(props, value => {
      className.value = classMap[value.type]
      text.value = textMap[value.type]
    })

    return {
      className, text
    }
  }
})
</script>

<style scoped>

</style>