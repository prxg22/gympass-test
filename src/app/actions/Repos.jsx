// libs
import { push } from 'connected-react-router'
import { fetchCommits, fetchRepos } from '../services/githubAPI'

/**
 * Action which lists repositories
 * @function
 * @param {String} username
 * @param {Array<Repo>} repos
 */
const getRepos = (username) => {
    return (dispatch, getState) => {
        dispatch({ type: 'FETCH_REPOS' })

        return fetchRepos(username)
            .then(repos => dispatch({
                type: 'FETCH_REPOS_SUCCESS',
                repos,
            }))
            .catch(error => {
                dispatch(push('/'))
                return dispatch({
                    type: 'FETCH_REPOS_ERROR',
                    error,
                })
            })
    }
}

const openRepo = (index) => (dispatch, getState) => {
    let repos = [...getState().repos]
    if (index < 0 || index > repos.length - 1) return dispatch({
        type: 'FETCH_COMMITS_ERROR',
        error: new Error('index out of boundaries!')
    })

    repos[index].isOpen = true
    repos[index].commits = null


    dispatch({
        type: 'FETCH_COMMITS',
        repos
    })

    const repo = repos[index]

    return fetchCommits(repo)
        .then((commits) => {
            if (!repo.commits) repo.commits = []
            repo.commits = [...repo.commits, ...commits]

            return dispatch({
                type: 'FETCH_COMMITS_SUCCESS',
                repos,
            })
        })
        .catch(error => dispatch({
            type: 'FETCH_COMMITS_ERROR',
            repos,
            error,
        }))
}

const closeRepo = (index) => (dispatch, getState) => {
    const repos = [...getState().repos]
    if (index < 0 || index > repos.length - 1) return dispatch({
        type: 'FETCH_COMMITS_ERROR',
        error: new Error('index out of boundaries!')
    })

    const repo = repos[index]
    repo.isOpen = false

    dispatch({
        type: 'FETCH_COMMITS_SUCCESS',
        repos
    })
}

export default {
    getRepos,
    openRepo,
    closeRepo,
}
