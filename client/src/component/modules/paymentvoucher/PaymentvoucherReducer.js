import _ from 'lodash'
import { FETCH_PVS } from '../../../redux/actions/types'

const INIT_STATE = {
    paymentvoucher: []
}

const paymentvoucherReducers = (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_PVS:
            return { ...state, banks: action.payload }
        default:
            return state;
    }

}

export default paymentvoucherReducers