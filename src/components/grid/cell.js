import { mergeData } from 'vue-functional-data-merge'
import memoize from '../../utils/memoize'
import suffixPropName from '../../utils/suffix-prop-name'
import { keys, assign, create } from '../../utils/object'

/**
 * Generates a prop object with a type of
 * [Boolean, String, Number]
 */
function boolStrNum() {
    return {
        type: [Boolean, String, Number],
        default: false
    }
}

/**
 * Generates a prop object with a type of
 * [String, Number]
 */
function strNum() {
    return {
        type: [String, Number],
        default: null
    }
}

export const computeBreakpointClass = memoize(function computeBreakpoint(type, breakpoint, value) {
    let className = type
    if (value === false || value === null || value === undefined) {
        return undefined
    }

    if (breakpoint) {

    }
})

const BREAKPOINTS = ['small', 'medium', 'large']

// Supports classes like: .small-6, .large-auto
const breakpointCol = BREAKPOINTS.reduce(
    // eslint-disable-next-line no-sequences
    (propMap, breakpoint) => ((propMap[breakpoint] = boolStrNum()), propMap),
    create(null)
)
// Supports classes like: .medium-offset-1, .large-offset-12
const breakpointOffset = BREAKPOINTS.reduce(
    // eslint-disable-next-line no-sequences
    (propMap, breakpoint) => ((propMap[suffixPropName(breakpoint, 'offset')] = strNum()), propMap),
    create(null)
)
// Supports classes like: .medium-order-1, .large-order-12
const breakpointOrder = BREAKPOINTS.reduce(
    // eslint-disable-next-line no-sequences
    (propMap, breakpoint) => ((propMap[suffixPropName(breakpoint, 'order')] = strNum()), propMap),
    create(null)
)

export const props = {
    tag: {
        type: String,
        default: 'div'
    },
    small: {
        type: [Boolean, String],
        default: false
    },
    medium: {
        type: [Boolean, String],
        default: false
    },
    large: {
        type: [Boolean, String],
        default: false
    },
    shrink: {
        type: Boolean,
        default: false
    },
    auto: {
        type: Boolean,
        default: false
    }
}

export default {
    functional: true,
    props,
    render(h, {
        props,
        data,
        children
    }) {
        return h(
            props.tag,
            mergeData(data, {
                staticClass: 'cell',
                class: {
                    'auto': props.auto,
                        'shrink': props.shrink
                }
            }),
            children
        )
    }
}