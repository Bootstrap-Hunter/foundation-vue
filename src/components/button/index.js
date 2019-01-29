import fButton from './button'
import fButtonClose from './button-close'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
  fButton,
  fBtn: fButton,
  fButtonClose,
  fBtnClose: fButtonClose
}

const VuePlugin = {
  install (Vue) {
    registerComponents(Vue, components)
  }
}

vueUse(VuePlugin)

export default VuePlugin
