import React, { useEffect } from "react";
import ContentHeader from "../../templates/ContentHeader";

import { connect, useDispatch } from 'react-redux'

import { fetchBanks } from '../../../redux/actions'

/* import { fetchBanks } from "../../../redux/actions"; */

import requireAuth from "../../auth/requireAuth"


const addClickHandler = () => {
    console.log('button clicked')

}
const button = {
    btnLabel: 'Tambah Data Baru',
    btnIcon: 'pen square',
    addClickHandler
}

const SetupBankList = (state) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBanks())

    }, [dispatch])

    return (
        <ContentHeader
            title="Bank Information"
            btn1={button}>

        </ContentHeader>
    )

}


const mapStateToProps = state => {
    console.log(state)
    return { banks: state.data }
}

export default connect(mapStateToProps, { fetchBanks })(requireAuth(SetupBankList))