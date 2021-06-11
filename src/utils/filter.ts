import {Data, StringList, TableItem} from "@/Types/app-components";

export const Filter = {
  bySearch(data: Data, search: string, searchKeys: TableItem[]) {
    return data.filter(record => {
      if (search === '') return true
      return searchKeys.some(key => {
        return record[key].includes(search)
      })
    })
  },

  bySelect(data: Data, currentSelects: StringList, defaultColumnValue: string = 'All') {
    if (Object.values(currentSelects).every(el => el === defaultColumnValue)) {
      return data
    }
    return data.filter(record => {
      const selectsEntries = Object.entries(currentSelects)

      return selectsEntries.every(([columnName, columnValue]) => {
        return record[columnName] === columnValue || columnValue === defaultColumnValue
      })
    })
  }
}