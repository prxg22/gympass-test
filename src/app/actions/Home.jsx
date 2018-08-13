import { push } from 'connected-react-router'

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

const submitUser = username => (dispatch) => {
    if (!username || typeof username !== 'string') {
        return dispatch({
            type: 'FETCH_REPOS_ERROR',
            username,
            error: new Error('Invalid username!'),
        })
    }

    return dispatch(push(`repos/${username}`))
}

export default {
    submitUser,
    reset,
}
