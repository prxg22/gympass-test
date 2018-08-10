// libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Icon from '../Icon'

// styles
import style from './Button.styl'

class Button extends Component {
    static propTypes = {
        /**
         * Button's content
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

        /**
         * If button should be disabled
         */
        disabled: PropTypes.bool,

        /**
         * Button small
         */
        small: PropTypes.bool,

        /**
         * Button block
         */
        block: PropTypes.bool,

        /**
         * Button pill
         */
        pill: PropTypes.bool,

        /**
         * Button active or focus
         */
        active: PropTypes.bool,

        /**
         * Button kind
         */
        kind: PropTypes.oneOf([
            'primary',
            'funnel',
            'inverse',
            'outline-primary',
            'outline-funnel',
            'outline-inverse',
        ]),

        /**
         * If it's provided, Link will be rendered on HTML <a> node
         */
        href: PropTypes.string,

        /**
         * Button type
         */
        type: PropTypes.oneOf(['button', 'reset', 'submit']),

        /**
         * Button icon
         */
        icon: PropTypes.string,

        /**
         * Icon position, if it exists
         */
        iconPosition: (props) => {
            if (props.icon && !props.iconPosition) {
                return new Error('icon property specified without also providing an iconPosition property.')
            }
            return undefined
        },

        /**
         * Button no-border
         */
        onlyIcon: PropTypes.bool,
    }

    static defaultProps = {
        children: '',
        className: '',
        getRef: null,
        disabled: false,
        small: false,
        kind: 'primary',
        block: false,
        pill: false,
        active: false,
        href: null,
        type: 'button',
        icon: null,
        iconPosition: '',
        onlyIcon: false,
    }

    render() {
        const {
            children,
            className,
            getRef,
            disabled,
            small,
            kind,
            block,
            pill,
            active,
            href,
            type,
            icon,
            iconPosition,
            onlyIcon,
            ...others
        } = this.props

        const noText = !children && !!icon

        const classes = classnames(className, {
            [style.btn]: true,
            [style['btn--small']]: !!small,
            [style['btn--block']]: !!block,
            [style['btn--pill']]: !!pill,
            [style['btn--active']]: !!active,
            [style[`btn--${kind}`]]: !!kind,
            [style['btn--no-text']]: noText,
            [style['btn--only-icon']]: onlyIcon,
        })

        const commonProps = {
            className: classes,
        }

        const iconClasses = classnames({
            [style.btn__icn]: !!icon,
            [style[`btn__icn--position-${iconPosition}`]]: !!iconPosition && !noText,
        })

        const buttonIcon = icon ? (
            <Icon size={small ? 'xxs' : 'xs'} className={iconClasses} name={icon} iconPosition={iconPosition || 'left'} />
        ) : null

        const buttonElement = (
            <button ref={e => getRef && getRef(e)} {...others} {...commonProps} disabled={disabled} type={type}>
                {buttonIcon}
                {children}
            </button>
        )

        const anchorElement = (
            <a ref={e => getRef && getRef(e)} {...others} {...commonProps} disabled={disabled} href={href}>
                {buttonIcon}
                {children}
            </a>
        )

        return href ? anchorElement : buttonElement
    }
}

export default Button
