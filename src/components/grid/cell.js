import { mergeData } from 'vue-functional-data-merge'
import memoize from '../../utils/memoize'
import suffixPropName from '../../utils/suffix-prop-name'
import { arrayIncludes } from '../../utils/array'
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
    let className = breakpoint
    if (value === false || value === null || value === undefined) {
        return undefined
    }

    if(arrayIncludes(['order', 'offset'], type)) {
        className += `-${type}`
    }

    className += `-${value}`

    return className.toLowerCase()
})

const BREAKPOINTS = ['small', 'medium', 'large']

// Supports classes like: .small-6, .large-auto
const breakpointCell = BREAKPOINTS.reduce(
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

// For loop doesn't need to check hasOwnProperty
// when using an object created from null
const breakpointPropMap = assign(create(null), {
    cell: keys(breakpointCell),
    offset: keys(breakpointOffset),
    order: keys(breakpointOrder)
})

export const props = assign({}, breakpointCell, breakpointOffset, breakpointOrder, {
    tag: {
        type: String,
        default: 'div'
    },
    shrink: {
        type: Boolean,
        default: false
    },
    auto: {
        type: Boolean,
        default: false
    }
})

export default {
    functional: true,
    props,
    render(h, { props, data, children }) {
        const classList = []
        // Loop through `cell`, `offset`, `order` breakpoint props
        for (const type in breakpointPropMap) {
            // Returns cellSm, offset, offsetSm, orderMd, etc.
            const keys = breakpointPropMap[type]
            for (let i = 0; i < keys.length; i++) {
                // computeBkPt(cell, cellSmall => Small, value=[String, Number, Boolean])
                const c = computeBreakpointClass(type, keys[i].replace(type, ''), props[keys[i]])
                // If a class is returned, push it onto the array.
                if (c) {
                    classList.push(c)
                }
            }
        }

        classList.push({
            [`offset-${props.offset}`]: props.offset,
            [`order-${props.order}`]: props.order,
            'auto': props.auto,
            'shrink': props.shrink
        })

        return h(
            props.tag,
            mergeData(data, {
                staticClass: 'cell',
                class: classList
            }),
            children
        )
    }
}