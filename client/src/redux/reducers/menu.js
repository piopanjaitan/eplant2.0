import { FETCH_MENU } from "../actions/types"

const INIT_STATE = {
    menu: []
}

const menu = (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_MENU:
            return {
                ...state, menu: action.payload
            }
        default:
            break;
    }

    return state
}

export default menu