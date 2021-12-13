import React, { useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import * as actions from '../../redux/actions'

import { useNavigate } from 'react-router-dom'

const SignOut = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {


        dispatch(actions.signout())

        /*         return () => {
                    navigate('/signin')
                } */
        navigate('/signin')
    }, [dispatch, navigate]);


    return <div>Log OUt</div>
}


export default connect(null, actions)(SignOut)