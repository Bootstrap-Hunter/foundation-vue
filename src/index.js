import * as components from './components'
import { vueUse } from './utils/plugins'

const VuePlugin = {
    install: function (Vue) {
        if (Vue._foundation_vue_installed) {
            return
        }
  
        Vue._foundation_vue_installed = true
  
        // Register component plugins
        for (let plugin in components) {
            Vue.use(components[plugin])
        }
    }
}
  
vueUse(VuePlugin)
  
export default VuePlugin