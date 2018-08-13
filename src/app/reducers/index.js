const initialState = { username: '' }

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    case 'INIT':
        return {
            isLoading: false,
            error: '',
        }
    case 'FETCH_REPOS':
        return {
            ...state,
            repos: [],
            isLoading: true,
            username: action.username,
        }
    case 'FETCH_REPOS_SUCCESS':
        return {
            ...state,
            isLoading: false,
            repos: action.repos,
            error: null,
        }
    case 'FETCH_REPOS_ERROR':
        return {
            ...state,
            isLoading: false,
            error: action.error,
        }
    case 'FETCH_COMMITS':
        return {
            ...state,
            index: action.index,
        }

    case 'FETCH_COMMITS_SUCCESS':
        return {
            ...state,
            repos: action.repos,
        }

    case 'FETCH_COMMITS_ERROR':
        return {
            ...state,
            repos: action.repos,
            error: action.error,
        }

    default:
        return state
    }
}
