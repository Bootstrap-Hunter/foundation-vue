import fGridContainer from './gridContainer'
import fGrid from './grid'
import fCell from './cell'
import { registerComponents, vueUse } from '../../utils/plugins'

const components = {
    fGridContainer,
    fGrid,
    fCell
}

const VuePlugin = {
    install (Vue) {
        registerComponents(Vue, components)
    }
}
  
vueUse(VuePlugin)
  
export default VuePlugin