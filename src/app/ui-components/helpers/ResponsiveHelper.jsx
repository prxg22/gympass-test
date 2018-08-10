import ErrorHelper from './ErrorHelper'
import WindowEventsHelper from './WindowEventsHelper'

const breakpointsMap = {
    xs: 0,
    sm: 375,
    md: 576,
    lg: 768,
    xl: 992,
    hd: 1200,
}


const breakpoints = Object.keys(breakpointsMap)
const breakpointEvents = new Map()

let current = breakpoints[breakpoints.length - 1]
let hash = 0


/**
 * Returns the viewport breakpoint
 */
const getViewPortBreakpoint = () => {
    const w = global.window
    if (!w) return breakpoints[breakpoints.length - 1]

    // gets viewport width
    const width = w.innerWidth

    // iterates through breakpoints to find the viewport one
    return breakpoints.reduce((viewport, breakpoint) => {
        const bpWidth = breakpointsMap[breakpoint]
        return width > bpWidth ? breakpoint : viewport
    }, breakpoints[0])
}

/**
 * Run specific breakpoint actions and updates current breakpoint
 */
const runActions = (breakpoint, e) => {
    const events = breakpointEvents.get(breakpoint)
    if (!events) return

    events.forEach(action => action(e))
}

/**
 * Registers main action on window resize event
 */
const registerListener = () => {
    WindowEventsHelper.addEvent('resize', (e) => {
        if (current === getViewPortBreakpoint()) return
        current = getViewPortBreakpoint()
        runActions(current, e)
    })
}

/**
 * creates an event map for an specific breakpoint and creates the window resize listener.
 * if the breakpoint event already exists, return it
 */
const createEventsMap = (breakpoint) => {
    if (breakpointEvents.size < 1) registerListener()
    if (breakpointEvents.has(breakpoint)) return breakpointEvents.get(breakpoint)

    const events = new Map()
    breakpointEvents.set(breakpoint, events)
    return events
}

/**
 * add event to specific breakpoints
 */
const addEvent = (breakpoint, action) => {
    if (!breakpoint || !action) ErrorHelper.error('addEvent requires breakpoint and action')

    if (Array.isArray(breakpoint)) return breakpoint.map(bp => addEvent(bp, action))

    const events = createEventsMap(breakpoint)

    hash += 1
    breakpointEvents.set(breakpoint, events.set(hash, action))

    return hash
}

/**
 * Remove event from a specific breakpoint of a set of breakpoints and hashes
 */
const removeEvent = (breakpoint, eventHash) => {
    if (!breakpoint || hash < 0) ErrorHelper.error('removeEvent requires breakpoint and hash')

    if (Array.isArray(breakpoint) && Array.isArray(eventHash) && breakpoint.length === hash.length) {
        return breakpoint.map((bp, i) => removeEvent(bp, eventHash[i]))
    } else if (Array.isArray(breakpoint) || Array.isArray(eventHash)) {
        ErrorHelper.error('breakpoint and hash to have the same type')
    } else if (Array.isArray(breakpoint) && Array.isArray(eventHash) && breakpoint.length !== hash.length) {
        ErrorHelper.error('breakpoint and hash to have the same size')
    }

    const events = breakpointsMap.get(breakpoint)
    if (!events) {
        ErrorHelper.warning(`The breakpoint ${breakpoint} doesn't have events registered`)
        return true
    }

    const event = events.get(eventHash)
    if (event) {
        ErrorHelper.warning(`The hash ${eventHash} was not found`)
        return true
    }

    events.delete(eventHash)

    return true
}

/**
 * create responsive modifier classes
 */
const checkResponsiveModifier = (prop, className, style) => {
    if (!prop) return {}
    if (!Array.isArray(prop)) {
        return style[className]
    }

    return breakpoints.reduce((classes, breakpoint) => ({
        ...classes,
        [style[`${className}-${breakpoint}`]]: prop.indexOf(breakpoint) > -1,
    }), {})
}


export default {
    breakpoints,
    addEvent,
    removeEvent,
    getViewPortBreakpoint,
    checkResponsiveModifier,
}
