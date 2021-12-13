const _ = require('lodash')
const oracledb = require('oracledb')
const database = require('../../oradb/dbHandler')

const baseQuery = ` select  rownum "ROWNUM" ,u.Loginid USERID, e.empname, e.empcode
 from epmsapps.userprofile u ,empmasterepms_consol e 
 where  u.email = e.empcode 
 and  usercode=:user_id`

const getUser = `SELECT loginid "loginid",company_initial "site"
FROM usercompanysite u, companysite s, company c
WHERE     loginid = :loginid
     AND u.companysiteid = s.companysiteid
     AND s.companyid = c.companyid
     AND u.companyid = c.companyid `

const getUserPass = `select  u.Loginid
 from epmsapps.userprofile u 
 where  u.loginid = :loginid and app_security_pkg.digest_f (:loginid, :password) = password`

const getUserCompany = `SELECT DISTINCT loginid
 FROM usercompanysite u, companysite s, company c
WHERE     u.companysiteid = s.companysiteid
      AND s.companyid = c.companyid
      AND u.companyid = c.companyid
      and loginid = :loginid
      and company_initial = :site`




const findUser = async function (loginid, callback) {

    binds = {}
    binds.loginid = loginid

    let result

    try {
        result = await database.getObject(getUser, binds)

        callback('', result.rows[0])

    } catch (error) {
        callback(error, '')
    }



}

const checkUserCompany = async function (loginid, site, callback) {

    binds = {}
    binds.loginid = loginid
    binds.site = site
    let result

    try {
        result = await database.getObject(getUserCompany, binds)
        callback('', result.rows[0])
    } catch (error) {
        callback(error, '')
    }




    //return result;
}

const checkPassword = async function (loginid, password, callback) {

    binds = {}
    binds.loginid = loginid
    binds.password = password

    let result

    try {
        result = await database.getObject(getUserPass, binds)
        callback('', result.rows[0])

    } catch (error) {
        callback(error, '')
    }



    //return result;
}



module.exports = {
    findUser,
    checkPassword,
    checkUserCompany
}
