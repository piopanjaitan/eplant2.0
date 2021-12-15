const _ = require('lodash')
const oracledb = require('oracledb')
const { param } = require('..')
const database = require('../../../oradb/dbHandler')

const baseQuery = `SELECT vouchercode	"vouchercode"
, bankcode	       "bankcode"
 ,datecreated	       "datecreated"
 ,totalamount	       "totalamount"
 ,vouchertype	       "vouchertype"
FROM paymentvoucher order by datecreated desc`




const fetchPV = async function (users, params, callback) {

    binds = {}

    console.log(params)

    binds.limitsize = (!params.size ? 0 : params.size)
    binds.page = (!params.page ? 1 : params.page)



    let result

    try {
        result = await database.siteLimitExecute(users, baseQuery, binds)
    } catch (error) {
        callback(error, '')
    }


    callback('', result.rows)
}

module.exports = {
    fetchPV
}


