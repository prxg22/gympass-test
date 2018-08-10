// libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Icon from '../Icon'

// styles
import style from './Target.styl'

class Target extends Component {
    static propTypes = {
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

        /**
         * Target type
         */
        kind: PropTypes.oneOf([
            'primary',
            'inverse',
        ]),

        /**
         * If link should be disabled
         */
        disabled: PropTypes.bool,

        /**
         * If it's provided, Target will be rendered on HTML <a> node
         */
        href: PropTypes.string,

        /**
         * Icon name
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
         * Role attribute
         */
        role: PropTypes.string,
    }

    static defaultProps = {
        children: '',
        className: '',
        getRef: null,
        kind: 'primary',
        disabled: false,
        href: null,
        icon: null,
        iconPosition: null,
        role: 'button',
    }

    render() {
        const {
            children,
            className,
            getRef,
            kind,
            disabled,
            href,
            icon,
            iconPosition,
            role,
            ...others
        } = this.props

        const noText = !children && !!icon

        const classes = classnames(className, {
            [style.link]: true,
            [style['link--inverse']]: kind === 'inverse',
            [style['link--no-text']]: noText,
        })

        const classesIcon = classnames(
            style.link__icn,
            { [style[`link__icn--position-${iconPosition}`]]: !!iconPosition && !noText },
        )

        const commonProps = {
            className: classes,
        }

        const buttonIcon = icon ? (
            <Icon name={icon} className={classesIcon} />
        ) : null

        const anchor = (
            <a ref={e => getRef && getRef(e)} {...others} {...commonProps} href={href} role={role}>
                {buttonIcon}
                <span className={style.link__label}>{children}</span>
            </a>
        )

        const button = (
            <button ref={e => getRef && getRef(e)} {...others} {...commonProps} disabled={disabled}>
                {buttonIcon}
                <span className={style.link__label}>{children}</span>
            </button>
        )

        return href ? anchor : button
    }
}

export default Target
