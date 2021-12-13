

async function get(req, res, next) {
    res.send(req.user)

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
