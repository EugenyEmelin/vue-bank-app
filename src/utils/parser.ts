import {
  Data,
  SelectItem,
  StringList,
  TableColumn,
  TableColumnOptions,
  TableItem,
  TableRow
} from "@/Types/app-components";

type SelectsContainer = {
  [key: string]: SelectItem
}

export const Parser = {
  selects(columns: TableColumn[], data: Data, columnKey: keyof TableColumn, columnName: keyof TableColumn) {
    const selectsContainer: SelectsContainer = {}
    columns.forEach(column => {
      const name = column[columnName]
      const key = column[columnKey]

      const optionsSet = new Set(['All'])

      const localData: Data = [...data]

      localData.forEach(record => {
        optionsSet.add(record[key])
      })

      selectsContainer[key] = {
        options: Array.from(optionsSet),
        label: `Select ${name.toLowerCase()}`,
        key
      }
    })

    return selectsContainer
  },

  defaultSelects(selectKeys: TableItem[], defaultSelect: string = 'All') {
    const obj: StringList = {}
    selectKeys.forEach(el => obj[el] = defaultSelect)
    return obj
  },

  // Router link
  routerLinkPath(column: TableColumnOptions, row: TableRow) {
    if (!column.hasOwnProperty('routerLink')) return

    const to = column.routerLink?.to

    if (typeof to === 'string') return to
    if (typeof to === 'object' && 'params' in to && Array.isArray(to.params)) {
      const paramsEntries = to.params.map(param => {
        return [param.key, row[param.property]]
      })
      const routeParams = Object.fromEntries(paramsEntries)

      return {
        name: to.name,
        params: routeParams
      }
    }
  }
}
