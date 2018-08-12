import { push } from 'connected-react-router'
import { getRepos as get, getCommits } from '../services/githubAPI'
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

const submitUser = username => (dispatch, getState) => {
    if (!username || typeof username !== 'string') return dispatch({
        type: 'FETCH_REPOS_ERROR',
        username,
        error: new Error('Invalid username!'),
    })

    return dispatch(push(`repos/${username}`))
}




//     return get(username)
//         .then((repos) => {
//             repos = repos.map(r => r.commits = [])
//             dispatch(Repos.listRepos(username, repos))
//
//             return dispatch({
//                 type: 'FETCH_REPOS_SUCCESS',
//                 username,
//                 repos,
//             })
//         })
//         .catch(error => dispatch({
//             type: 'FETCH_REPOS_ERROR',
//             error,
//         }))
// }



export default {
    submitUser,
    reset,
}
