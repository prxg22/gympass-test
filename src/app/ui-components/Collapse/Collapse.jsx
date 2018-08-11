// libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// styles
import style from './Collapse.styl'

// constants
const INITIAL_CONTENT = { header: null, body: null }

/*
 * Reduce children to content object ({ header, body })
 */
const reduceChildren = children => children.reduce((content, child) => {
    if (child.props['data-collapse-header']) {
        return { ...content, header: child }
    }

    return { ...content, body: child }
}, INITIAL_CONTENT)

class Collapse extends Component {
    static propTypes = {
        /**
         * Collapse's content
         */
        children: PropTypes.arrayOf(PropTypes.node).isRequired,

        /**
         * Callback which will be called on open action
         */
        onOpen: PropTypes.func,

        /**
         * Callback which will be called on close action
         */
        onClose: PropTypes.func,

        /**
        * Custom classes
        */
        className: PropTypes.string,

        /**
         * Callback which will receive row's main node as attribute
         */
        getRef: PropTypes.func,

    }

    static defaultProps = {
        getRef: null,
        className: '',
        onOpen: null,
        onClose: null,
    }

    state = {
        /**
         * indicates if body is opened or not
         */
        open: false,

        /**
         * indicates the closing animation state
         */
        closing: false,
    }

    componentDidMount = () => {
        // sets content
        this.content = this.props.children
    }

    componentWillReceiveProps = (nextProps) => {
        // updates content if it's necessary
        if (nextProps.children !== this.props.children) this.content = nextProps.children
    }

    /**
     * Return content object
     */
    get content() {
        return this._content
    }

    /*
     * Sets content object and updates state
     */
    set content(children) {
        const { state } = this

        this._content = reduceChildren(children, () => this.toggle())

        this.setState(state)
    }

    /**
     * Object containing collapse`s header and body
     */
    _content = INITIAL_CONTENT

    /**
     * Toggles collapse's body
     */
    toggle = () => {
        const { state, props } = this
        const { onOpen, onClose } = props

        const nextState = { open: !state.open, closing: false }

        let animation = null

        if (state.open) {
            animation = { closing: true }
        }

        this.setState(animation || nextState, () => {
            if (!state.open && onOpen) onOpen()
            if (state.open && onClose) onClose()

            if (!animation) return null
            if (!global.window) return this.setState(nextState)

            return global.window.setTimeout(() => this.setState(nextState), 200)
        })
    }

    renderHeader = () => {
        const { header } = this.content

        if (!header) return null

        return React.cloneElement(header, {
            className: classnames(header.className, style.collapse__header),
            onClick: () => this.toggle(),
            role: 'button',
        })
    }

    renderBody = () => {
        const { state, content } = this
        const { body } = content

        if (!body || !state.open) return null

        return React.cloneElement(body, {
            className: classnames(
                body.className,
                style.collapse__body,
            ),
        })
    }

    render = () => {
        const {
            state,
            content,
            props,
        } = this

        const { header, body } = content

        // return null if content is not set yet
        if (!header || !body) return null

        const {
            getRef,
            className,
            children,
            ...others
        } = props

        const classes = classnames(
            style.collapse,
            {
                [style['collapse--closing']]: state.closing,
            },
            className,
        )

        return (
            <div
                className={classes}
                ref={e => getRef && getRef(e)}
                {...others}
            >
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        )
    }
}

export default Collapse
