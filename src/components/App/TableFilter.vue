<template>
  <div class="flex-container">
    <div class="filter">
      <div class="form-control form-control-search" v-if="needSearch">
        <input type="text" id="search" placeholder="search..." v-model="search">
      </div>
      <div
          v-for="select in selects"
          :key="select.key"
          class="form-control"
          v-if="needSelect"
      >
        <label :for="select.key" class="input-mini-label">{{select.label}}</label>
        <select :id="select.key" v-model="currentSelects[select.key]">
          <option
              v-for="(option, i) in select.options"
              :value="option"
              :key="i + Math.random()"
          >
            {{option}}
          </option>
        </select>
      </div>
    </div>
    <div class="reset" v-if="hasBeenFiltered">
      <button class="btn warning reset-btn" @click="resetFilters">Reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, reactive, ref, watch} from 'vue'
import {Parser} from "@/utils/parser"
import {Filter} from "@/utils/filter";
import {Data, TableColumn, TableColumnOptions } from '@/Types/app-components';

export default defineComponent({
  name: 'ComponentName',
  props: {
    columns: {
      type: Array as PropType<TableColumnOptions[]>,
      required: true
    },
    columnKey: {
      type: String as PropType<keyof TableColumn>,
      default: 'key'
    },
    columnName: {
      type: String as PropType<keyof TableColumn>,
      default: 'name'
    },
    data: {
      type: Array as PropType<Data>,
      required: true
    },
  },
  emits: ['hasBeenFiltered'],

  setup(props, {emit}) {
    const columns = props.columns
    const data = props.data
    const columnKey = props.columnKey
    const columnName = props.columnName


    const search = ref('')

    const selectableCols = columns.filter(column => column.selectable)
    const selectKeys = selectableCols.map(column => column[columnKey])
    const defaultSelects = ref(Parser.defaultSelects(selectKeys))

    const searchableCols = columns.filter(column => column.searchable)
    const searchKeys = searchableCols.map(column => column[columnKey])


    const selects = computed(() => Parser.selects(selectableCols, data, columnKey, columnName))
    const currentSelects = reactive(defaultSelects)

    const hasBeenFiltered = computed(() => {
      const searchIsEmpty = search.value === ''
      const selectsIsDefault = Object.values(currentSelects.value).every(value => value == 'All')
      return !searchIsEmpty || !selectsIsDefault
    })

    const filteredBySearch = computed(() => Filter.bySearch(data, search.value, searchKeys))
    const filteredBySelect = computed(() => Filter.bySelect(filteredBySearch.value, currentSelects.value))

    watch(filteredBySelect, () => {
      emit('hasBeenFiltered', filteredBySelect.value)
    })

    const resetFilters = () => {
      search.value = ''
      defaultSelects.value = Parser.defaultSelects(selectKeys)
      emit('hasBeenFiltered', data)
    }

    const needSelect = selectableCols.length > 0
    const needSearch = searchableCols.length > 0
    return {
      search, needSelect, needSearch, selects,
      filteredBySearch, currentSelects, filteredBySelect,
      resetFilters, hasBeenFiltered
    }
  }
})
</script>

<style scoped>

</style>