// libs
import PropTypes from 'prop-types'

// helpers
import ResponsiveHelper from '../helpers/ResponsiveHelper'

/**
 * Type for props which can be either booleans or an array of breakpoints
 *
 * ex. <Row alignTop alignBottom={['xs', 'sm']}></Row>
 */
export const responsiveModifierType = PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf([...ResponsiveHelper.breakpoints, '']),
])
