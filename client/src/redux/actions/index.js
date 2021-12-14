import eplant from '../../apis/eplant'


import { SIGN_IN, SIGN_OUT, FETCH_STREAMS, AUTH_ERROR, AUTH_USER, FETCH_MENU, FETCH_USER, FETCH_BANKS } from "./types"

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }

}

export const signout = () => {
    localStorage.removeItem('token')

    return {
        type: AUTH_USER,
        payload: ''
    }

}

export const signin = (formpost, callback) => async dispatch => {

    try {

        const response = await eplant.post('/signin', formpost)

        dispatch({ type: AUTH_USER, payload: response.data.token })

        localStorage.setItem('token', response.data.token)

        if (callback) callback();
    }
    catch (error) {
        console.log(error)
        dispatch({ type: AUTH_ERROR, payload: 'user or password wrong' })

    }
}


export const fetchUserInfo = () => async dispatch => {

    const response = await eplant.get('/user')

    dispatch({ type: FETCH_USER, payload: response.data })
}

export const fetchsite = () => async dispatch => {

    try {
        const response = await eplant.get('/site')

        dispatch({ type: AUTH_USER, payload: response.data.token })

        //localStorage.setItem('token', response.data.token)
        //if (callback) callback();
    }
    catch (error) {
        console.log(error)
        dispatch({ type: AUTH_ERROR, payload: 'user or password wrong' })

    }
}

export const fetchBanks = () => async dispatch => {

    const response = await eplant.get('/cashbank/bankinformation')
    // console.log(response)

    dispatch({ type: FETCH_BANKS, payload: response.data })

}

export const fetchMenu = () => async dispatch => {

    const response = await eplant.get('/menu')

    //    console.log(response)

    dispatch({ type: FETCH_MENU, payload: response.data })

}


/* 
export const createStream = (formValues, callback) => async (dispatch, getState) => {
    const { userId } = getState().auth

    streams.post('/streams', { ...formValues, userId }).then((response) => {
        dispatch({ type: CREATE_STREAM, payload: response.data })
        callback()
    }
    ).catch((e) => console.log(e))

    // programmatic navigation after create success

}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams')

    dispatch({ type: FETCH_STREAMS, payload: response.data })
}

export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`)

    dispatch({ type: FETCH_STREAM, payload: response.data })
}

export const deleteStream = (id, callback) => async dispatch => {

    streams.delete(`/streams/${id}`, callback).then((response) => {
        dispatch({ type: DELETE_STREAM, payload: id })
        callback()
    }
    ).catch((e) => console.log(e))

}

export const editStream = (id, formValues, callback) => async dispatch => {
    //  const response = await streams.put(`/streams/${id}`, formValues)

    //    dispatch({ type: UPDATE_STREAM, payload: response.data })


    streams.patch(`/streams/${id}`, { ...formValues }).then((response) => {
        dispatch({ type: UPDATE_STREAM, payload: response.data })
        callback()
    }
    ).catch((e) => console.log(e))
}

 */

/* export const signup = (formpost, callback) => async dispatch => {
    //    console.log('run')
    try {
        const response = await axios.post('http://localhost:3090/signup', formpost)

        dispatch({ type: AUTH_USER, payload: response.data.token })

        localStorage.setItem('token', response.data.token)
        if (callback) callback();
    }
    catch (error) {
        console.log(error)
        dispatch({ type: AUTH_ERROR, payload: 'email In use' })

    }
} */
