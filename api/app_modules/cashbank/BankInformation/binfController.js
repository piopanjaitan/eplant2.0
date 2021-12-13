const binf_db = require('./binf_db')

async function get(req, res, next) {

    await binf_db.fetchBanks(req.user, (error, result) => {
        if (error) {
            return next(error)
        }

        res.send(result)

    })
    /*     const context = {};
        context.id = req.params.userids;
    
        //   await database_api.initWF(context);
        const rows = await database_api.find(context);
    
    
    
        if (rows[0]) {
            // console.log(`not null -> ${rows} , ${JSON.stringify(rows[0])}`)
            if (req.params.id) {
                if (rows.length === 1) {
                    res.status(200).json({ client: ip, data: rows[0] });
                }
                else if (rows.length > 1) {
                    res.status(200).json({ client: ip, data: rows });
                } else {
                    res.status(404).end();
                }
            } else {
                res.status(200).json({ client: ip, data: rows });
            }
        } else {
            console.log(`null ->`)
    
            res.status(200).json({ data: [] });
        } */

}

module.exports.get = get;


async function post(req, res, next) {

    const context = {};

    context.document = req.body;

    //    console.log(`data --> ${ JSON.stringify(req.body)}`)

    const rows = await database_api.wf_approval(context);


    //console.log(`return -> ${ context.user}`)

    if (rows) {
        //console.log(`not null -> ${rows} , ${JSON.stringify(rows[0])}`)
        res.status(200).json({
            data: rows
        });
    } else {
        //    console.log(`null ->`)

        res.status(200).json({ data: [] });
    }
}

module.exports.post = post

async function put(req, res, next) {

    const context = {};
    context.id = req.body.id;

    //await database_api.initWF(context);
    const rows = await database_api.find(context);


    if (rows[0]) {
        //   console.log(`not null -> ${rows} , ${JSON.stringify(rows[0])}`)
        if (req.params.id) {
            if (rows.length === 1) {
                res.status(200).json({ data: rows[0] });
            }
            else if (rows.length > 1) {
                res.status(200).json({ data: rows });
            } else {
                res.status(404).end();
            }
        } else {
            res.status(200).json({ data: rows });
        }
    } else {
        console.log(`null ->`)

        res.status(200).json({ data: [] });
    }

}

module.exports.put = put;

async function getDetails(req, res, next) {

    const context = {};
    context.mrcodes = req.params.mrcodes;

    //   await database_api.initWF(context);
    const rows = await database_api.findDetail(context);


    if (rows[0]) {
        if (req.params.mrcodes) {
            if (rows.length === 1) {
                //res.status(200).json({ data: rows[0] });
                res.status(200).json({ data: rows });

            }
            else if (rows.length > 1) {
                res.status(200).json({ data: rows });
            } else {
                res.status(404).end();
            }
        } else {
            res.status(200).json({ data: rows });
        }
    } else {
        res.status(200).json({ data: [] });
    }

}

module.exports.getDetails = getDetails;