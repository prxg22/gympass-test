import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const ModalPortal = (props) => {
    const { children, container } = props

    if (!container) return null

    return ReactDOM.createPortal(children, container)
}

ModalPortal.propTypes = {
    /**
    * Portals DOM node reference
    */
    container: PropTypes.element.isRequired,

    /**
     * Modal's content
     */
    children: PropTypes.node.isRequired,
}

export default ModalPortal
