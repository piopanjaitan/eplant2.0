const _ = require('lodash')
const oracledb = require('oracledb')
const database = require('../../../oradb/dbHandler')

const baseQuery = ` SELECT BANKCODE,BANKNAME,CONTROLACCOUNT,
BANKACCOUNTCODE,AUTHORIZEDSIG1,CURRENCY,DATEREGISTERED
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


