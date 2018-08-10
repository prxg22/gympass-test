// throw error with msg err
const error = (err) => {
    const msg = err || 'UI-components error!'
    throw new Error(msg)
}

// consoles warn
const warning = (warn) => {
    const msg = warn || 'UI-components warning!'
    console.warn(msg) // eslint-disable-line
}

export default {
    error,
    warning,
}
