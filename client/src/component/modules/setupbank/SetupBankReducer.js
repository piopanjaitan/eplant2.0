import _ from 'lodash'
import { FETCH_BANK, FETCH_BANKS } from '../../../redux/actions/types'

const INIT_STATE = {
    banks: []
}

const setupBankReducers = (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_BANKS:
            return { ...state, banks: action.payload }
        //    return { ...state, banks: { ..._.mapKeys(action.payload, 'bankcode') } }
        case FETCH_BANK:
            return { ...state, [action.payload.bankcode]: action.payload }
        /*         case CREATE_STREAM:
                    return { ...state, [action.payload.id]: action.payload }
                case UPDATE_STREAM:
                    return { ...state, [action.payload.id]: action.payload }
                case DELETE_STREAM:
                    return _.omit(state, action.payload)
         */
        default:
            return state;
    }

}

export default setupBankReducers