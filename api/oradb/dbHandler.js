const oracledb = require('oracledb');
const dbCreds = require('./dbCredentials.js');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

/* const initConnection = async (schema) => {
    await oracledb.createPool(dbCreds.gcmPool);
}

const closeConnection = async (schema) => {
    await oracledb.getPool().close()
} */

/*
 * call to epmsapps connection 
 */


const limitQuery = subquery => {
    return `SELECT z.*,ceil ("total_rows"/:limitsize ) "max_page"
            FROM (SELECT a.*, COUNT (*) OVER () "total_rows", ROWNUM "rnum"
            FROM ( ${subquery} ) a)z
            WHERE "rnum" BETWEEN (( :page * :limitsize) - :limitsize + 1 ) and (:page * :limitsize)` }

const appsExecute = async (statement, binds = []) => {


    options = {
        outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
        // extendedMetaData: true,               // get extra metadata
        // prefetchRows:     100,                // internal buffer allocation size for tuning
        // fetchArraySize:   100                 // internal buffer allocation size for tuning
    };


    return new Promise(async (resolve, reject) => {
        let conn;
        let errors = {}
        try {
            conn = await oracledb.getConnection(dbCreds.appsPool)

            const result = await conn.execute(statement, binds, options)

            resolve(result)
        } catch (error) {

            errors = { 'errorNum': error.errorNum, 'errorMessage': error.message }

            console.log(errors)
            reject(errors)
        } finally {
            if (conn) { // conn assignment worked, need to close
                try {
                    await conn.close()
                } catch (err) {
                    console.log(err)
                }
            }
        }
    });
}

const getObject = async (statement, binds = []) => {


    options = {
        outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
        // extendedMetaData: true,               // get extra metadata
        // prefetchRows:     100,                // internal buffer allocation size for tuning
        // fetchArraySize:   100                 // internal buffer allocation size for tuning
    };


    return new Promise(async (resolve, reject) => {
        let conn;
        let errors = {}
        try {
            conn = await oracledb.getConnection(dbCreds.appsPool)

            const result = await conn.execute(statement, binds, options)

            resolve(result)
        } catch (error) {
            //   console.log(error.message)
            reject(error.message)
        } finally {
            if (conn) { // conn assignment worked, need to close
                try {
                    await conn.close()
                } catch (err) {
                    reject(error.message)
                    //            console.log(err)
                }
            }
        }
    });
}

const siteExecute = async (users, statement, binds = [], opts = {}) => {
    return new Promise(async (resolve, reject) => {
        let conn;
        let dbConnection;

        opts.outFormat = oracledb.OBJECT;

        // console.log(binds)

        switch (users.site) {
            case 'GCM':
                dbConnection = dbCreds.gcmPool;
                break;
            case 'SMG':
                dbConnection = dbCreds.smgPool;
                break;
            case 'SBE':
                dbConnection = dbCreds.sbePool;
                break;
            case 'SLM':
                dbConnection = dbCreds.slmPool;
                break;
            case 'SJE':
                dbConnection = dbCreds.sjePool;
                break;
            default:
                dbConnection = dbCreds.appsPool;
                break;
        }

        try {
            conn = await oracledb.getConnection(dbConnection);

            const result = await conn.execute(statement, binds, opts)

            resolve(result)
        } catch (err) {
            reject(err)
        } finally {
            if (conn) { // conn assignment worked, need to close
                try {
                    await conn.close()
                } catch (err) {
                    console.log(err)
                }
            }
        }
    });
}


const siteLimitExecute = async (users, statement, binds = [], opts = {}) => {
    return new Promise(async (resolve, reject) => {
        let conn;
        let dbConnection;

        opts.outFormat = oracledb.OBJECT;

        // console.log(binds)

        console.log(limitQuery(statement))

        switch (users.site) {
            case 'GCM':
                dbConnection = dbCreds.gcmPool;
                break;
            case 'SMG':
                dbConnection = dbCreds.smgPool;
                break;
            case 'SBE':
                dbConnection = dbCreds.sbePool;
                break;
            case 'SLM':
                dbConnection = dbCreds.slmPool;
                break;
            case 'SJE':
                dbConnection = dbCreds.sjePool;
                break;
            default:
                dbConnection = dbCreds.appsPool;
                break;
        }

        try {
            conn = await oracledb.getConnection(dbConnection);

            const result = await conn.execute(statement, binds, opts)

            resolve(result)
        } catch (err) {
            reject(err)
        } finally {
            if (conn) { // conn assignment worked, need to close
                try {
                    await conn.close()
                } catch (err) {
                    console.log(err)
                }
            }
        }
    });
}


const simpleExecute = async (statement, binds = [], opts = {}) => {
    return new Promise(async (resolve, reject) => {
        let conn;
        opts.outFormat = oracledb.OBJECT;


        try {
            conn = await oracledb.getConnection(dbCreds.usPool);

            //  console.log(statement)
            const result = await conn.execute(statement, binds, opts)

            resolve(result)
        } catch (err) {
            reject(err)
        } finally {
            if (conn) { // conn assignment worked, need to close
                try {
                    await conn.close()
                } catch (err) {
                    console.log(err)
                }
            }
        }
    });
}



const headerDetail = async (statement, statementdetails, binds = [], opts = {}) => {
    return new Promise(async (resolve, reject) => {
        let conn;

        opts.outFormat = oracledb.OBJECT;
        // opts.autoCommit = true;

        try {
            conn = await oracledb.getConnection(dbCreds.defaultPool);



            const header = await conn.execute(statement, binds, opts)
            const detail = await conn.execute(statementdetails, binds, opts)


            resolve({ header, detail })
        } catch (err) {
            reject(err)
        } finally {
            if (conn) { // conn assignment worked, need to close
                try {
                    await conn.close()
                } catch (err) {
                    console.log(err)
                }
            }
        }
    });
}

const functionExecute = async (statement, binds = [], opts = {}) => {
    return new Promise(async (resolve, reject) => {
        let conn;
        opts.outFormat = oracledb.OBJECT;

        //  console.log(dbCreds.usPool , binds)
        try {
            conn = await oracledb.getConnection(dbCreds.usPool);

            //  console.log(`db execute -> ${JSON.stringify(binds)  }`)

            const result = await conn.execute(
                statement,
                binds,
                opts
            );

            resolve(result)

        } catch (err) {
            console.log(`error db executes -> ${JSON.stringify(err)}`)

            reject(err)
        } finally {
            if (conn) { // conn assignment worked, need to close
                try {
                    await conn.close()
                } catch (err) {
                    console.log(err)
                }
            }
        }
    });
}

module.exports = {
    /* initConnection,
    closeConnection,
     */simpleExecute,
    headerDetail,
    functionExecute,
    appsExecute,
    getObject,
    siteExecute,
    siteLimitExecute
}