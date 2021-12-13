import { AUTH_ERROR, AUTH_USER, FETCH_SITE } from "../actions/types"

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
        default:
            break;
    }

    return state
}

export default auth