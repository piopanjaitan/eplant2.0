import { combineReducers } from 'redux'
import auth from './auth'
import SetupBankList from '../../component/modules/setupbank/SetupBankReducer'
import menu from './menu'


const reducers =
    combineReducers(
        {
            auth,
            menu,
            SetupBankList
        }
    )


/* export default combineReducers
    (
        {
            auth: authReducer,
            form: formReducer,
            streams: streamReducers

        }
    )

 */

export default reducers

