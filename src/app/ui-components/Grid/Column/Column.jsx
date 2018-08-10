// libs
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// types
import { responsiveModifierType } from '../types'

// helpers
import ResponsiveHelper from '../../helpers/ResponsiveHelper'

// styles
import style from './Column.styl' // eslint-disable-line

// breakpoints propTypes
const breakpointType = PropTypes.shape(ResponsiveHelper.breakpoints.reduce(
    (type, breakpoint) => ({
        ...type,
        [breakpoint]: PropTypes.number,
    }),
    {},
))

// breakpoints default props
const breakpointDefaultProps = ResponsiveHelper.breakpoints.reduce((type, breakpoint) => (
    { ...type, [breakpoint]: 0 }
), {})

// prints grid column
class Column extends Component {
    static propTypes = {
        /**
         * Custom classes
         */
        className: PropTypes.string,

        /**
         * Column content
         */
        children: PropTypes.node.isRequired,

        /**
         * Object mapping breakpoint and how many cols should use it in each one
         */
        cols: breakpointType,

        /**
         * Object mapping breakpoint and how many cols should use it in each one as offset
         */
        offsets: breakpointType,

        /**
         * Aligns col on top. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        alignTop: responsiveModifierType,

        /**
         * Aligns col on bottom. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        alignBottom: responsiveModifierType,

        /**
         * Aligns col on center. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        alignCenter: responsiveModifierType,

        /**
         * Stretches col. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        alignStretch: responsiveModifierType,

        /**
         * Stretches col. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        hidden: responsiveModifierType,

        /**
         * Removes col's gutters. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        noGutter: responsiveModifierType,

        /**
         * Callback that receives column main element as argument
         */
        getRef: PropTypes.func,
    }

    static defaultProps = {
        className: '',
        cols: breakpointDefaultProps,
        offsets: breakpointDefaultProps,
        alignTop: false,
        alignBottom: false,
        alignCenter: false,
        alignStretch: false,
        hidden: false,
        noGutter: false,
        getRef: null,
    }

    // iterate through props.cols properties and build col classes
    createColClasses = () => Object.entries(this.props.cols).reduce(
        (classes, col) => ({
            ...classes,
            [style[`col-${col[0]}-${col[1]}`]]: col[1] > 0,
        }),
        {},
    )

    // iterate through props.offset properties and build col offset classes
    createOffsetClasses = () => Object.entries(this.props.offsets).reduce(
        (classes, offset) => ({
            ...classes,
            [style[`col--offset-${offset[0]}-${offset[1]}`]]: offset[1] > 0,
        }),
        {},
    )


    render() {
        const {
            children,
            cols,
            className,
            offsets,
            alignTop,
            alignCenter,
            alignBottom,
            alignStretch,
            hidden,
            noGutter,
            getRef,
            ...others
        } = this.props

        const classes = classnames(
            style.col,
            className,
            {
                ...this.createColClasses(cols),
                ...this.createOffsetClasses(offsets),
            },
            ResponsiveHelper.checkResponsiveModifier(alignTop, 'col--top', style),
            ResponsiveHelper.checkResponsiveModifier(alignBottom, 'col--bottom', style),
            ResponsiveHelper.checkResponsiveModifier(alignCenter, 'col--center', style),
            ResponsiveHelper.checkResponsiveModifier(alignStretch, 'col--stretch', style),
            ResponsiveHelper.checkResponsiveModifier(hidden, 'col--hidden', style),
            ResponsiveHelper.checkResponsiveModifier(noGutter, 'col--no-gutter', style),
        )

        return (
            <div className={classes} ref={e => getRef && getRef(e)} {...others}>
                {children}
            </div>
        )
    }
}

export default Column
