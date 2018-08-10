import React from 'react'
import ReactDOM from 'react-dom'

import App from './app/App'

const root = global.window.document.getElementById('root')
if (root) {
    ReactDOM.render(
        (<App title="githubstars" />),
        root,
    )
}
