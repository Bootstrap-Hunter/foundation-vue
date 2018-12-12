import { mergeData } from 'vue-functional-data-merge'
import { arrayIncludes } from '../../utils/array'

export const props = {
    tag: {
        type: String,
        default: 'div'
    },
    type: {
        type: String,
        default: 'horizontal',
        validate: value => arrayIncludes(['horizontal', 'vertical'], value)
    }
}

export default {
    functional: true,
    props,
    render (h, { props, data, children }) {
        const staticClass = 'grid-' + (props.type === 'horizontal' ? 'x' : 'y')

        return h(
            props.tag,
            mergeData(data, {
                staticClass
            }),
            children
        )
    }
}