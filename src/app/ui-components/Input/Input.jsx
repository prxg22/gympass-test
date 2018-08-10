import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import style from './Input.styl'

class Input extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        label: PropTypes.string,
        errorMsg: PropTypes.string,
        className: PropTypes.string,
        getRef: PropTypes.func,
    }

    static defaultProps = {
        label: '',
        errorMsg: '',
        className: '',
        getRef: null,
    }

    render = () => {
        const {
            label,
            name,
            getRef,
            className,
            errorMsg,
            ...others
        } = this.props

        const classes = classnames(
            style.input,
            className,
            { [style['input--error']]: errorMsg },
        )

        const errorClasses = classnames(
            style.input__error,
            'caption',
            { [style['input__error--active']]: errorMsg },
        )

        return (
            <div className={style.input__container}>
                <label className={style.input__label} htmlFor={`i${name}`}>{label}</label>
                <input className={classes} ref={e => getRef && getRef(e)} name={name} id={`i${name}`} {...others} />
                <span className={errorClasses}>{errorMsg}</span>
            </div>
        )
    }
}

export default Input
