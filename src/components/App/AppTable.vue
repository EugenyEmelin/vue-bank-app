<template>
  <TableFilter
    v-if="filterable"
    :columns="columns"
    :data="data"
    @hasBeenFiltered="setFilteredData"
  />
  <Loader v-if="loading"></Loader>
  <table :class="tableClass" v-else>
    <thead>
    <tr>
      <th v-if="numerable">№</th>
      <th v-for="(th, i) in columns" :key="getRandom(i)">{{ th[columnName] }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row, i) in filteredData" :key="getRandom(i)">
      <td v-if="numerable">{{ i + 1 }}</td>
      <td v-for="(column, i) in columns" :key="getRandom(i)">
        <router-link :to="Parser.routerLinkPath(column, row)" v-slot="{navigate}" v-if="column.routerLink">
          <slot name="actionButton" @click="navigate"></slot>
        </router-link>
        <span v-if="column.valueType === 'currency'">{{ Formatter.currency(row[column[columnKey]]) }}</span>
        <StatusLabel
            v-else-if="column.useLabel"
            :type="row[column[columnKey]]"
            :textMap="column.useLabel.textMap"
            :classMap="column.useLabel.classMap"
        />
        <span v-else>{{ row[column[columnKey]] }}</span>
      </td>
    </tr>
    </tbody>
  </table>
  <h3 v-if="data.length === 0 && !loading">{{ noDataMessage }}</h3>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, reactive, Ref, ref } from 'vue'
import Loader from '@/components/UI/Loader.vue'
import {Formatter} from "@/utils/formatter"
import StatusLabel from '@/components/UI/StatusLabel.vue'
import TableFilter from '@/components/App/TableFilter.vue'
import { Data, TableColumn, TableColumnOptions, TableRow } from '@/Types/app-components'
import {Parser} from "@/utils/parser";

export default defineComponent({
  name: 'AppTable',
  components: {
    Loader, StatusLabel, TableFilter
  },
  props: {
    data: {
      type: Array as PropType<Data>,
      required: true,
      default: []
    },
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
    filterable: {
      type: Boolean,
      default: false
    },
    numerable: {
      type: Boolean,
      default: false
    },
    noDataMessage: {
      type: String,
      default: 'No data'
    },
    tableClass: {
      type: [String, Array] as PropType<String | String[]>
    },
    loading: {
      type: Boolean
    }
  },

  setup(props) {
    const columns = props.columns
    const data = props.data
    const filteredData = ref<Data>(data)

    const setFilteredData = (dataFromFilter: Data) => {
      filteredData.value = dataFromFilter
    }
    const getRandom = (i: number) => {
      return i + Math.random()
    }

    return {
      columns, data,
      Formatter, Parser,
      setFilteredData,
      filteredData,
      getRandom,
    }
  }
})
</script>