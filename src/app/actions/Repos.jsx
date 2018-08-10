// libs
import { push } from 'connected-react-router'
import { brainnAPI } from '../services'
import HomeActions from './Home'

/**
 * Action which lists repositories
 * @function
 * @param {String} username
 * @param {Array<Repo>} repos
 */
const listRepos = (username, repos) => (dispatch, getState) => {
    const { location } = getState().router
    if (!location.path || location.path !== `/repos/${username}`) dispatch(push(`/repos/${username}`))
    return dispatch({
        type: 'LIST_REPOS',
        username,
        repos,
    })
}

/**
 * Action which edits repository with _id tags
 * @function
 * @param {String} _id
 * @param {Array<String>} tags
 */
const openModal = ({ _id, tags }) => dispatch => dispatch({
    type: 'REPO_TAG',
    _id,
    tags,
})

/**
 * Action which edits repository with _id tags
 * @function
 * @param {String} _id
 * @param {Array<String>} tags
 */
const updateRepoTags = (_id, tags) => (dispatch, getState) => {
    dispatch({ type: 'UPDATE_TAG' })
    return brainnAPI.updateRepoTags(_id, tags)
        .then(() => {
            dispatch({
                ...getState(),
                type: 'UPDATE_TAG_SUCCESS',
                tags: [],
                _id: '',
                isLoading: false,
            })
            return dispatch(HomeActions.getUserRepos(getState().username))
        })
        .catch((e) => dispatch({
            ...getState(),
            type: 'UPDATE_TAG_ERROR',
            tags: [],
            _id: '',
            error: e,
            isLoading: false,
        }))
}

/**
 * Action which close modal
 * @function
 * @param {String} _id
 * @param {Array<String>} tags
 */
const closeModal = () => ({
    type: 'CLOSE_MODAL',
    _id: '',
    tags: [],
})


export default {
    listRepos,
    openModal,
    updateRepoTags,
    closeModal,
}
