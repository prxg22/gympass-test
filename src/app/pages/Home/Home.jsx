import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Home as HomeActions } from '../../actions'

import UserBox from './components/UserBox'
import Loader from '../../ui-components/Loader'

class Home extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        isLoading: PropTypes.bool,
        error: PropTypes.shape({ message: PropTypes.string }),
        dispatch: PropTypes.func.isRequired,
    }

    static defaultProps = {
        isLoading: false,
        error: null,
        username: '',
    }

    render() {
        const {
            username,
            error,
            isLoading,
            dispatch,
        } = this.props


        if (isLoading) {
            return (<Loader />)
        }

        return (
            <UserBox
                onChange={(u) => { this.username = u || username }}
                onSubmit={() => dispatch(HomeActions.getUserRepos(this.username))}
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
