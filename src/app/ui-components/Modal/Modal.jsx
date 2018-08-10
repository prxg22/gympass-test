// libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// style
import style from './Modal.styl'

// helpers
import WindowEventsHelper from '../helpers/WindowEventsHelper'

// Printi components
import ModalPortal from './ModalPortal'
import { Row, Column } from '../Grid'
import Box from '../Box'
import Button from '../Button'

// constants
/**
 * Modal's initial content
 */
const INITIAL_CONTENT = { main: [], footer: null }

/**
 * Separate main content from footer
 */
const reduceChildrenToContent = children => [...children].reduce((content, child) => {
    const { props } = child
    const { main } = content

    // check if child is the footer
    if (!props || !props['data-modal-footer']) return { footer: content.footer, main: [...main, child] }

    return {
        main,
        footer: React.cloneElement(child, {
            className: style.modal__footer,
        }),
    }
}, INITIAL_CONTENT)


class Modal extends Component {
    static propTypes = {
        /**
        * If modal is opened or not
        */
        isOpen: PropTypes.bool,

        /**
        * On close callback, it's called after any user's close action (eg. click on background, press esc)
        * It's expected to change props.isOpen
        */
        onClose: PropTypes.func,

        /**
         * Modal's content
         */
        children: PropTypes.node,

        /**
         * Callback which will receive modal's main node as attribute
         */
        getRef: PropTypes.func,

        /**
         * Custom classes
         */
        className: PropTypes.string,

    }

    static defaultProps = {
        isOpen: false,
        onClose: null,
        children: '',
        getRef: null,
        className: '',
    }

    state = {
        container: null,
        closing: false,
        isOpen: false,
    }

    componentDidMount = () => {
        const { state, props } = this
        if (global.window) state.container = global.window.document.body

        this.setState(state, () => {
            if (props.isOpen) this.open()
            this.content = props.children
        })
    }

    componentWillReceiveProps = (nextProps) => {
        const { state, props } = this

        if (!state.isOpen && nextProps.isOpen) this.open()
        else if (state.isOpen && !nextProps.isOpen) {
            this.close()
            return
        }

        if (props.children !== nextProps.children) this.content = nextProps.children
    }

    componentWillUnmount = () => {
        const { state } = this
        state.container.classList.remove(style.modal__background)
    }

    /**
     * Return content object
     */
    get content() {
        return this._content
    }

    /**
     * Set modal's content
     */
    set content(children) {
        let { _content } = this

        if (!Array.isArray(children)) {
            this._content = {
                main: children,
                footer: null,
            }

            return
        }

        _content = reduceChildrenToContent(children, _content)

        this._content = _content
    }

    /**
     * Row wrapper's reference
     */
    wrapper = null

    /**
     * object containing modal's main content and footer
     */
    _content = {
        main: [],
        footer: null,
    }

    /**
     * Open modal
     */
    open = () => {
        const { state } = this

        if (state.isOpen || !state.container) return

        // add class to blur container
        state.container.classList.add(style.modal__background)

        // add esc event
        this.escEvent = WindowEventsHelper.addEvent('keyup', e => this.handleEscClick(e.keyCode))

        this.setState({ isOpen: true })
    }

    /**
     * Close modal
     */
    close = () => {
        const { state } = this

        if (!state.isOpen || !state.container) return

        // remove esc event
        if (this.escEvent && WindowEventsHelper.removeEvent('keyup', this.escEvent)) this.escEvent = null

        this.setState({ closing: true }, () => {
            if (!global.window) {
                this.setState(
                    { isOpen: false },
                    () => state.container.classList.remove(style.modal__background),
                )
            }

            global.window.setTimeout(() => {
                this.setState({ isOpen: false, closing: false }, () => {
                    state.container.classList.remove(style.modal__background)
                })
            }, 480)
        })
    }

    /**
     * Call onClose event
     */
    handleCloseAction = () => {
        if (this.props.onClose) this.props.onClose()
    }

    /**
     * Close modal if user clicks out of it
     */
    handleBackgroundClick = (element) => {
        const { wrapper } = this
        if (!wrapper || wrapper !== element.target) return

        this.handleCloseAction()
    }

    /**
     * Check key pressed, if it's ESC, close modal
     */
    handleEscClick = (key) => {
        if (key === 27) this.handleCloseAction()
    }

    render() {
        const { state, content } = this
        if (!state.container || !state.isOpen) return null

        const {
            className,
            getRef,
        } = this.props

        const classes = classnames(
            className,
            style.modal,
            {
                [style['modal--closing']]: state.closing,
            },
        )

        return (
            <ModalPortal container={state.container}>
                <Row
                    className={style.modal__wrapper}
                    justifyCenter="center"
                    alignCenter="center"
                    onClick={(e) => { this.handleBackgroundClick(e) }}
                    getRef={(e) => { this.wrapper = e }}
                    onKeyUp={e => this.handleEscClick(e.key)}
                >
                    <Column cols={{ md: 6, xl: 4 }} noGutter={['md', 'lg', 'xl', 'hd']}>
                        <Box
                            className={classes}
                            getRef={e => getRef && getRef(e)}
                            noBorder
                        >
                            <Row className={style.modal__content}>
                                <Column className={style.modal__header} noGutter>
                                    <Button
                                        className={style['modal__close-button']}
                                        icon="times"
                                        onlyIcon
                                        onClick={() => { this.handleCloseAction() }}
                                    />
                                </Column>
                                <Column className={style.modal__body} noGutter>
                                    {content.main}
                                </Column>
                            </Row>
                            {content.footer}
                        </Box>
                    </Column>
                </Row>
            </ModalPortal>
        )
    }
}

export default Modal
