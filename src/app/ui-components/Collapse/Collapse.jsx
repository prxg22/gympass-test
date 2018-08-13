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
         * Callback which will be called on open action. Should change isOpen
         */
        isOpen: PropTypes.boolean,

        /**
         * Callback which will be called on open action. Should change isOpen
         */
        onOpen: PropTypes.func,

        /**
         * Callback which will be called on close action. Should change isOpen
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
        isOpen: false,
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
        const { isOpen, onOpen, onClose } = this.props

        this._content = reduceChildren(children, () => {
            if (isOpen) return onClose()
            return onOpen()
        })

        this.setState({ ...this.state })
    }

    /**
     * Object containing collapse`s header and body
     */
    _content = INITIAL_CONTENT

    renderHeader = () => {
        const { header } = this.content
        const { isOpen, onOpen, onClose } = this.props

        if (!header) return null

        return React.cloneElement(header, {
            className: classnames(header.className, style.collapse__header),
            onClick: () => {
                if (isOpen) return onClose()
                return onOpen()
            },
            role: 'button',
        })
    }

    renderBody = () => {
        const { props, content } = this
        const { body } = content
        const { isOpen } = props

        if (!body || !isOpen) return null

        return React.cloneElement(body, {
            className: classnames(
                body.className,
                style.collapse__body,
            ),
        })
    }

    render = () => {
        const {
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
            isOpen,
            ...others
        } = props

        const classes = classnames(
            style.collapse,
            {
                [style['collapse--closing']]: !isOpen,
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
