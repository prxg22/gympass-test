import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { HomeActions } from '../../actions'
import UserBox from '../../ui-components/UserBox'

class Home extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        error: PropTypes.shape({ message: PropTypes.string }),
        dispatch: PropTypes.func.isRequired,
    }

    static defaultProps = {
        error: null,
        username: '',
    }

    render() {
        const {
            username,
            error,
            dispatch,
        } = this.props

        return (
            <UserBox
                onChange={(u) => { this.username = u || username }}
                onSubmit={() => dispatch(HomeActions.submitUser(this.username))}
                errorMsg={error ? error.message : ''}
            />
        )
    }
}

const mapStateToProps = (state) => {
    const {
        username,
        error,
        isLoading,
    } = (state)

    return {
        username,
        error,
        isLoading,
    }
}

export default connect(mapStateToProps)(Home)
