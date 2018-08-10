// lib
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// styles
import style from './Container.styl'

/**
 * Grid's container
 */
class Container extends React.Component {
    static propTypes = {
        /**
         * Container's content
         */
        children: PropTypes.node.isRequired,
        /**
         * Custom classes
         */
        className: PropTypes.string, // grid container classes
        /**
         * if container is fluid (width: 100%)
         */
        fluid: PropTypes.bool, // if container is fluid or not
        /**
         * Get main element ref
         */
        getRef: PropTypes.func, // handler will receive container element as argument
    }

    static defaultProps = {
        className: '',
        fluid: false,
        getRef: null,
    }

    render() {
        const {
            children,
            className,
            fluid,
            getRef,
            ...others
        } = this.props

        const classes = classnames(
            className,
            {
                [style.container]: !fluid,
                [style['container--fluid']]: fluid,
            },
        )

        return (
            // eslint-disable-line
            <div
                ref={e => getRef && getRef(e)}
                className={classes}
                {...others}
            >
                {children}
            </div>
        )
    }
}

export default Container
