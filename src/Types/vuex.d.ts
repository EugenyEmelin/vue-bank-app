// vuex.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {

    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}

declare interface RootState {
    [key: string]: any
}

declare interface AuthState {
    token: string | null
}

declare interface OrdersState {
    orders: Array
}

declare type StoreAlert = {
    value: string,
    type: 'danger' | 'warning' | 'primary'
}

declare interface ErrorsState {
    message: StoreAlert | null
}