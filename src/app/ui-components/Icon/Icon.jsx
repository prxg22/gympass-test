// libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// styles
import style from './Icon.styl'

class Icon extends Component {
    static propTypes = {
        /**
         * Callback which will receive row's main node as attribute
         */
        getRef: PropTypes.func,

        /**
         * Custom classes
         */
        className: PropTypes.string,

        /**
         * Icon name
         */
        name: PropTypes.string.isRequired,

        /**
         * Size classes
         */
        size: PropTypes.oneOf([
            '',
            'xs',
            'sm',
            'md',
            'lg',
            'xl',
            'xxl',
            'big',
        ]),

    }

    static defaultProps = {
        getRef: null,
        className: '',
        size: 'xs',
    }

    render() {
        const {
            getRef,
            className,
            name,
            size,
            ...others
        } = this.props

        const classes = classnames(
            style.icn,
            className,
            `fas fa-${name}`,
            {
                [style[`icn--${size}`]]: !!size,
            },
        )

        return <span ref={e => getRef && getRef(e)} className={classes} aria-hidden="true" {...others} />
    }
}

export default Icon
