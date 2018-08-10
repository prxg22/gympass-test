// libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// styles
import style from './Box.styl'

class Box extends Component {
    static propTypes = {
        /**
         * Theme defines border, font and background colors
         */
        theme: PropTypes.oneOf([
            '',
            'primary',
        ]),

        /**
         * Box's status. Defines border-right color
         */
        status: PropTypes.oneOf([
            '',
            'info',
        ]),

        /**
         * If true, box get 90deg angles
         */
        noRadius: PropTypes.bool,

        /**
         * If true, removes box's border
         */
        noBorder: PropTypes.bool,

        /**
         * If true, looks visually disabled
         */
        disabled: PropTypes.bool,

        /**
         * Object of type shadow = {[color]: [shadow-level]}
         */
        shadow: PropTypes.oneOf([
            PropTypes.shape({
                grey: PropTypes.number,
            }),
            null,
        ]),

        /**
         * Sets image as box's background
         */
        backgroundUrl: PropTypes.string,

        /**
         * Sets an opacity on background
         */
        backgroundOpacity: PropTypes.bool,

        /**
         * Box's content
         */
        children: PropTypes.node,

        /**
         * Callback which will receive row's main node as attribute
         */
        getRef: PropTypes.func,

        /**
         * Custom classes
         */
        className: PropTypes.string,
    }

    static defaultProps = {
        getRef: null,
        className: '',
        children: '',
        noRadius: false,
        noBorder: false,
        shadow: null,
        backgroundUrl: null,
        backgroundOpacity: false,
        theme: '',
        status: '',
        disabled: false,
    }

    render() {
        const {
            children,
            className,
            getRef,
            noRadius,
            noBorder,
            shadow,
            backgroundUrl,
            theme,
            status,
            backgroundOpacity,
            disabled,
            ...others
        } = this.props

        let shadowProps = []
        if (shadow) [shadowProps] = Object.entries(shadow)

        if (backgroundUrl) others.style = { ...others.style, backgroundImage: `url(${backgroundUrl})` }

        const classes = classnames(
            style.box,
            className,
            {
                [style['box--no-radius']]: noRadius,
                [style['box--no-border']]: noBorder,
                [style[`box--shadow-${shadowProps[0]}-${shadowProps[1]}`]]: shadow && shadow[shadowProps[0]],
                [style[`box--bg-image`]]: !!backgroundUrl,
                [style[`box--${theme}`]]: theme && !backgroundOpacity,
                [style[`box--${theme}-opacity`]]: theme && backgroundOpacity,
                [style[`box--${status}`]]: status,
                [style['box--disabled']]: disabled,
            },
        )

        return (
            <div
                className={classes}
                ref={e => getRef && getRef(e)}
                {...others}
            >
                {children}
            </div>
        )
    }
}

export default Box
