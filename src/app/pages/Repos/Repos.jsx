// libs
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// ui
import Loader from '../../ui-components/Loader'

// types
import { RepoPropType } from '../../types'

// actions
import { ReposActions, HomeActions } from '../../actions'

// components
import { ReposList } from './components'

class Repos extends React.Component {
    static propTypes = {
        repos: PropTypes.arrayOf(RepoPropType),
        username: PropTypes.string,
        isLoading: PropTypes.bool,
        router: PropTypes.shape({ location: PropTypes.string }),
        dispatch: PropTypes.func.isRequired,
    }

    static defaultProps = {
        username: '',
        repos: [],
        isLoading: false,
        router: null,
    }

    componentWillMount() {
        const {
            router,
            username,
            repos,
            dispatch,
        } = this.props

        const { pathname } = router.location

        // checks if has username or path to show list, if not reset app
        if (!username && pathname) this.resolvePath(pathname)
        else if (!username) dispatch(HomeActions.reset())
        else if (username && (!repos || repos.length < 1)) dispatch(ReposActions.getRepos(username))
    }

    resolvePath(path) {
        const { dispatch } = this.props
        const arr = path.split('/')
        if (arr[1] === 'repos' && arr[2] && typeof arr[2] === 'string') dispatch(ReposActions.getRepos(arr[2]))
    }

    render() {
        const {
            repos,
            isLoading,
            dispatch,
        } = this.props


        if (isLoading) {
            return (<Loader />)
        }

        return (
            <div>
                <ReposList
                    onOpen={(index) => dispatch(ReposActions.openRepo(index))}
                    onClose={(index) => dispatch(ReposActions.closeRepo(index))}
                    repos={repos}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        username,
        repos,
        _id,
        error,
        isLoading,
        router,
    } = (state)

    return {
        username,
        repos,
        _id,
        error,
        isLoading,
        router,
    }
}

export default connect(mapStateToProps)(Repos)
