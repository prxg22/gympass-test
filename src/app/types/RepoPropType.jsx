import PropTypes from 'prop-types'
/**
 * represents an repository
 *
 * @typedef RepoPropType
 * @param {String} _id
 * @param {String} name
 * @param {String} languages
 * @param {String[]} tags
 */
const RepoPropType = PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    languages: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),

})

export default RepoPropType
