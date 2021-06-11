import {RouterLinkParam} from "@/Types/router";

type TableItem = string

type LabelTextType = 'danger' | 'warning' | 'success' | 'default'
type LabelNumberType = 'neutral' | 'positive' | 'negative'

type StringList = {
  [key: string]: string
}
type NumberClassMap = {
  positive: string
  negative: string
  neutral: string
}
declare type TableRow = {[key: string]: any}
declare type Data = TableRow[]

declare type ColumnKey = 'key' | 'prop'
declare type ColumnName = 'name' | 'title' | 'label'

declare type SelectItem = {
  options: string[]
  label: string
  key: string
}

type ColumnKeyPick = Pick<TableColumnOptions, ColumnKey>
type ColumnNamePick = Pick<TableColumnOptions, ColumnName>


// declare type TableColumn = Extract<TableColumnOptions, {[key: string]: string}>
// declare type TableColumn = ColumnKeyPick & ColumnNamePick

declare interface TableColumn {
  key: TableItem
  name: TableItem
}


declare interface TableColumnOptions extends TableColumn {
  // Нужно ли производить поиск по значению колонки таблицы в строке поиска
  searchable?: boolean
  // нужно ли формировать select-коллекцию по значениям колонки
  selectable?: boolean
  // Тип значения для его визуализации в ячейке таблицы
  valueType?: 'currency' | 'date'
  // Визуально оформленный ярлычок таблицы
  useLabel?: {
    // Example: canceled: 'danger', done: 'success', pending: 'default'
    textMap?: StringList | boolean
    classMap?: StringList | boolean
  } | boolean
  // Визуально окрашенное числовое значение таблицы
  numberLabel?: NumberClassMap| boolean
  // Кнопка для перехода к конкретному объекту таблицы
  routerLink?: {
    to: {
      name: string
      params?: RouterLinkParam[]
    } | string
  }
}

declare type Order = {
  fullName: string
  amount: number
  phone: string

}
