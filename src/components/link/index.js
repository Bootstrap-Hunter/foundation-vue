import fLink from './link'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  fLink
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
