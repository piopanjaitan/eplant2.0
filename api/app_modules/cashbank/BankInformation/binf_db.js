const _ = require('lodash')
const oracledb = require('oracledb')
const database = require('../../../oradb/dbHandler')

const baseQuery = ` SELECT BANKCODE "bankcode",BANKNAME "bankname",CONTROLACCOUNT "controlaccount",
BANKACCOUNTCODE "bankaccountcode",AUTHORIZEDSIG1 "authorizedsig1",CURRENCY "currency",DATEREGISTERED "dateregistered"
FROM BANK`




const fetchBanks = async function (users, callback) {

    binds = {}

    let result

    try {
        result = await database.siteExecute(users, baseQuery, binds)
    } catch (error) {
        callback(error, '')
    }


    callback('', result.rows)
}

module.exports = {
    fetchBanks
}


