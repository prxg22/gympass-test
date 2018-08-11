import { push } from 'connected-react-router'
import { getRepos as get } from '../services/githubAPI'
import Repos from './Repos'

const reset = () => (dispatch, getState) => {
    const { location } = getState().router

    if (location.pathname && location.pathname !== '/') dispatch(push('/'))

    return dispatch({
        type: 'INIT',
        username: '',
        error: '',
        isLoading: false,
    })
}


const getRepos = (username) => {
    if (!username) return false

    return (dispatch, getState) => {
        dispatch({
            type: 'FETCH_REPOS',
            username,
        })

        const { location } = getState().router

        if (location.pathname && location.pathname !== '/') dispatch(push('/'))

        return get(username)
            .then((repos) => {
                dispatch(Repos.listRepos(username, repos))
                return dispatch({
                    type: 'FETCH_REPOS_SUCCESS',
                    username,
                    repos,
                })
            })
            .catch(error => dispatch({
                type: 'FETCH_REPOS_ERROR',
                error,
            }))
    }
}


export default {
    getRepos,
    reset,
}
