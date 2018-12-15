import { mergeData } from 'vue-functional-data-merge'
import { assign, create } from '../../utils/object'

function boolProp() {
    return {
        type: Boolean,
        default: false
    }
}

const MODIFIERS = ['fluid', 'full']

const modifierProps = MODIFIERS.reduce(
    (propMap, modifier) => ((propMap[modifier] = boolProp()), propMap),
    create(null)
)

export const props = assign({}, modifierProps, {
    tag: {
        type: String,
        default: 'div'
    }
})

export default {
    functional: true,
    props,
    render (h, { props, data, children }) {
        const classList = []

        for(const modifier in modifierProps) {
            if(props[modifier]) {
                classList.push(modifier)
            }
        }

        return h(
            props.tag,
            mergeData(data, {
                staticClass: 'grid-container',
                class: classList
            }),
            children
        )
    }
}