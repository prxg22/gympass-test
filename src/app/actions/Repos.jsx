// libs
import { push } from 'connected-react-router'

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


export default {
    listRepos,
}
