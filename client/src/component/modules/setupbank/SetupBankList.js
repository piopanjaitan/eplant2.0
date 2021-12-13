import React from "react";
import ContentHeader from "../../templates/ContentHeader";
import { Outlet } from "react-router-dom";


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

const SetupBankList = () => {
    return (
        <ContentHeader
            title="Bank Information"
            btn1={button}>
            <div style={{ marginLeft: '1000px' }}>
                <h1>KOSONG</h1>
            </div>
            <Outlet />
        </ContentHeader>
    )

}

export default requireAuth(SetupBankList)