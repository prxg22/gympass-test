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
    case 'LIST_REPOS':
        return {
            ...state,
            username: action.username,
            repos: action.repos,
        }
    case 'REPO_TAG':
        return {
            ...state,
            _id: action._id,
            tags: action.tags,
        }
    case 'UPDATE_TAG_SUCCESS':
        return {
            ...state,
            _id: action._id,
            tags: action.tags,
        }
    case 'ERROR_TAG_SUCCESS':
        return {
            ...state,
            _id: action._id,
            tags: action.tags,
            error: action.error
        }
    case 'CLOSE_MODAL':
        return {
            ...state,
            _id: action._id,
            tags: action.tags,
        }

    default:
        return state
    }
}
