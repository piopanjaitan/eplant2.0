import { AUTH_ERROR, AUTH_USER, FETCH_SITE, FETCH_USER } from "../actions/types"

const INIT_STATE = {
    authenticated: '',
    errorMessage: '',
    site: []
}

const auth = (state = INIT_STATE, action) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state, authenticated: action.payload
            }

        case AUTH_ERROR:
            return {
                ...state, errorMessage: action.payload
            }

        case FETCH_SITE:
            return {
                ...state, site: action.payload
            }
        case FETCH_USER:
            return {
                ...state, user: action.payload
            }
        default:
            break;
    }

    return state
}

export default auth