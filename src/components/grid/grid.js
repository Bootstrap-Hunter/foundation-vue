import { mergeData } from 'vue-functional-data-merge'
import { arrayIncludes } from '../../utils/array'
import suffixPropName from '../../utils/suffix-prop-name'
import { assign, create } from '../../utils/object'

const GUTTERS = ['margin', 'padding']
const GUTTERS_DIRECTION = ['x', 'y']

// Make props for gutters mixed from arrays above eg. margin-x, padding-y
const guttersPropMap = GUTTERS.reduce(
    // eslint-disable-next-line no-sequences
    (propMap, gutter) => (GUTTERS_DIRECTION.map(dir => propMap[suffixPropName(dir, gutter)] = { type: Boolean, default: false }), propMap),
    create(null)
)

export const props = assign({}, guttersPropMap, {
    tag: {
        type: String,
        default: 'div'
    },
    type: {
        type: String,
        default: 'horizontal',
        validate: value => arrayIncludes(['horizontal', 'vertical'], value)
    }
})

export default {
    functional: true,
    props,
    render (h, { props, data, children }) {
        const staticClass = 'grid-' + (props.type === 'horizontal' ? 'x' : 'y')
        const classList = []
        // Loop over `margin` and `padding` gutter props
        for(const gutter in guttersPropMap) {
            // If gutter is set
            if(props[gutter]) {
                // Get kebab-case prop name
                const gutterCssName = gutter.replace( /([a-z])([A-Z])/, "$1-$2").toLowerCase()
                // Finally push correct class to array
                classList.push(`grid-${gutterCssName}`)
            }
        }

        return h(
            props.tag,
            mergeData(data, {
                staticClass,
                class: classList
            }),
            children
        )
    }
}