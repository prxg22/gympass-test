// libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// styles
import style from './Tag.styl'

class Tag extends Component {
    static propTypes = {
        /**
         * Column content
         */
        children: PropTypes.node.isRequired,

        /**
         * Tag type
         */
        type: PropTypes.oneOf([
            '',
            'secondary',
        ]),

        /**
         * Tag shape
         */
        shape: PropTypes.oneOf([
            '',
            'price',
        ]),

        /**
         * If tag is large
         */
        large: PropTypes.boolean,

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
        type: '',
        shape: '',
        large: false,
        className: '',
        getRef: null,
    }

    render() {
        const {
            children,
            type,
            shape,
            large,
            className,
            getRef,
            ...others
        } = this.props

        // creates tag main classes
        const classes = classnames(
            style.tag,
            className,
            {
                [style[`tag--${type}`]]: !!type,
                [style[`tag--large`]]: !!large,
                [style[`tag--shape-price`]]: shape === 'price',
            },
        )

        return (
            <span
                ref={e => getRef && getRef(e)}
                className={classes}
                {...others}
            >
                {children}
            </span>
        )
    }
}

export default Tag
