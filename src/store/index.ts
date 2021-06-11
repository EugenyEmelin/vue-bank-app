import {createStore, createLogger, ModuleTree} from "vuex"

const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

const modulesFiles = require.context('./modules', true, /\.[t|j]s$/)
const modulesNames = modulesFiles.keys()


const modules = modulesNames.reduce((modulesList: ModuleTree<Object>, modulePath: string) => {
  // меняем './moduleName.ts' на 'moduleName'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  modulesList[moduleName] = modulesFiles(modulePath).default
  return modulesList
}, {})


type UIState = {
  sidebar: boolean
}


export default createStore({
  state(): UIState {
    return {
      sidebar: false
    }
  },
  mutations: {
    openSidebar(state: UIState) {
      state.sidebar = true
    },
    closeSidebar(state: UIState) {
      state.sidebar = false
    }
  },
  actions: {},
  modules,
  plugins
})
