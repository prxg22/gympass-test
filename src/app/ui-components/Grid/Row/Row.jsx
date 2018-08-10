// libs
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// types
import { responsiveModifierType } from '../types'

// helpers
import ResponsiveHelper from '../../helpers/ResponsiveHelper'

// styles
import style from './Row.styl'

/**
 * Grid's row
 */
class Row extends React.Component {
    static propTypes = {
        /**
         * Custom classes
         */
        className: PropTypes.string,

        /**
         * Row content
         */
        children: PropTypes.node.isRequired,

        /**
         * Aligns row's children on top. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        alignTop: responsiveModifierType,

        /**
         * Aligns row's children on bottom. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        alignBottom: responsiveModifierType,

        /**
         * Aligns row's children on center. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        alignCenter: responsiveModifierType,

        /**
         * Stretch row's children. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        alignStretch: responsiveModifierType,

        /**
         * Justifies row's content to its start. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        justifyStart: responsiveModifierType,

        /**
         * Justifies row's content to its center. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        justifyCenter: responsiveModifierType,

        /**
         * Justifies row's content to its end. Accepts an array of breakpoints
         * in which should be applied or true if it's always applied
         */
        justifyEnd: responsiveModifierType,

        /**
         * Changes row's direction to row-reverse
         */
        reverse: responsiveModifierType,

        /**
         * Array of breakpoints in which row should be fluid or true if it's alawys is fluid
         */
        fluid: responsiveModifierType,

        /**
         * Callback which will receive row's main node as attribute
         */
        getRef: PropTypes.func,
    }

    static defaultProps = {
        className: '',
        alignTop: false,
        alignBottom: false,
        alignCenter: false,
        alignStretch: false,
        justifyStart: false,
        justifyCenter: false,
        justifyEnd: false,
        reverse: false,
        getRef: null,
        fluid: false,
    }

    render() {
        const {
            children,
            className,
            alignTop,
            alignBottom,
            alignCenter,
            alignStretch,
            justifyStart,
            justifyCenter,
            justifyEnd,
            reverse,
            getRef,
            fluid,
            ...others
        } = this.props

        const classes = classnames(
            className,
            style.row,
            ResponsiveHelper.checkResponsiveModifier(alignTop, 'row--top', style),
            ResponsiveHelper.checkResponsiveModifier(alignBottom, 'row--bottom', style),
            ResponsiveHelper.checkResponsiveModifier(alignCenter, 'row--center', style),
            ResponsiveHelper.checkResponsiveModifier(alignStretch, 'row--stretch', style),
            ResponsiveHelper.checkResponsiveModifier(justifyStart, 'row--justify-start', style),
            ResponsiveHelper.checkResponsiveModifier(justifyCenter, 'row--justify-center', style),
            ResponsiveHelper.checkResponsiveModifier(justifyEnd, 'row--justify-end', style),
            ResponsiveHelper.checkResponsiveModifier(reverse, 'row--reverse', style),
            ResponsiveHelper.checkResponsiveModifier(fluid, 'row--fluid', style),
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

export default Row
