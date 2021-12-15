const pvDB = require('./pvDB')

async function get(req, res, next) {

    console.log(req.query)

    await pvDB.fetchPV(req.user, req.query, (error, result) => {


        if (error) {
            return next(error)
        }

        res.send(result)

    })

}

module.exports.get = get;
