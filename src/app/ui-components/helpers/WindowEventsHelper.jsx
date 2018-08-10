import ErrorHelper from './ErrorHelper'


const eventsMap = new Map() // main events map
const createHash = () => Math.ceil(Math.random() * (2 ** 9)) // creates a hash

// run all event listeners when it's triggered with eventResponse as argument
const runEventActions = (event) => {
    if (!eventsMap.has(event.type)) return
    const actions = eventsMap.get(event.type)

    actions.forEach(action => action(event))
}

// register action on event map and return hash
const addEvent = (event, action) => {
    if (!event || !action) {
        ErrorHelper.error('addEvent() needs the event and action params')
        return false
    }

    // check if event listener is already registred, if it's not, register it and creates
    // event's on eventsMap entry
    if (!eventsMap.has(event)) {
        global.window.addEventListener(event, runEventActions)
        eventsMap.set(event, new Map())
    }

    const eventMap = eventsMap.get(event)

    // creates hash on specific event map
    let hash
    do { hash = createHash() } while (eventMap.has(hash))

    eventMap.set(hash, action)
    return hash
}

const removeEvent = (event, hash) => {
    if (!event || !hash) {
        return ErrorHelper
            .error('removeEvent() needs the event and hash (returned by WindowEventsHelper.addEvent) params')
    }

    // checks if event exists on eventsMap
    if (!eventsMap.has(event)) {
        ErrorHelper.warning(`${event} isn't registered`)
        return false
    }

    const eventMap = eventsMap.get(event)

    // checks if hash exists on event map
    if (!eventMap.has(hash)) {
        ErrorHelper.warning(`${event} isn't registered`)
        return false
    }

    eventMap.delete(hash)

    // check if event map is empty and unregister it from window if it is
    if (eventMap.size === 0) {
        global.window.removeEventListener(event, runEventActions)
        eventsMap.delete(event)
    }

    return true
}

export default {
    addEvent,
    removeEvent,
}
