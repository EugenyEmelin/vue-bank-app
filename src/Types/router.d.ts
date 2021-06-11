import {RouteRecordRaw} from "vue-router";

declare type AppRoute = RouteRecordRaw & {
  meta: {
    layout: LayoutName,
    auth?: boolean
  }
}
/* Example:
* :to="{name: "routeName", params: { key1: row.property1, key2: row.property2}, ... }" */
declare type RouterLinkParam = {
  key: string
  property: string
}