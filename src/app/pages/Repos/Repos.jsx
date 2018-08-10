// libs
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// ui
import Loader from '../../ui-components/Loader'
import Modal from '../../ui-components/Modal'

// types
import { RepoPropType } from '../../types'

// actions
import { Home as HomeActions, Repos as ReposActions } from '../../actions'

// components
import { ReposList, EditTag } from './components'

class Repos extends React.Component {
    static propTypes = {
        repos: PropTypes.arrayOf(RepoPropType),
        tags: PropTypes.arrayOf(PropTypes.string),
        username: PropTypes.string,
        isLoading: PropTypes.bool,
        _id: PropTypes.string,
        router: PropTypes.shape({ location: PropTypes.string }),
        dispatch: PropTypes.func.isRequired,
    }

    static defaultProps = {
        username: '',
        repos: [],
        tags: [],
        isLoading: false,
        _id: '',
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
        else if (username && (!repos || repos.length < 1)) dispatch(HomeActions.getUserRepos(username))

        return true
    }

    resolvePath(path) {
        const { dispatch } = this.props
        const arr = path.split('/')
        if (arr[1] === 'repos' && arr[2] && typeof arr[2] === 'string') dispatch(HomeActions.getUserRepos(arr[2]))
    }

    handleTagSubmit(t) {
        this.props.dispatch(ReposActions.updateRepoTags(this.props._id, t))
    }

    render() {
        const {
            repos,
            _id,
            isLoading,
            tags,
            dispatch,
        } = this.props


        if (isLoading) {
            return (<Loader />)
        }

        return (
            <div>
                <ReposList
                    onClick={repo => dispatch(ReposActions.openModal(repo))}
                    repos={repos}
                />
                <Modal
                    isOpen={_id && tags}
                    onClose={() => dispatch(ReposActions.closeModal())}
                >
                    <EditTag tags={tags} onSubmit={t => this.handleTagSubmit(t)}/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {
        username,
        repos,
        _id,
        tags,
        searchedTags,
        error,
        isLoading,
        router,
    } = (state)

    return {
        username,
        repos,
        tags,
        _id,
        searchedTags,
        error,
        isLoading,
        router,
    }
}

export default connect(mapStateToProps)(Repos)
