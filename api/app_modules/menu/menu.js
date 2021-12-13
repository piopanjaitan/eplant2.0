const menu_db = require('./menu_db')
const router = require('express').Router()
const _ = require('lodash')

router.route(`/`)
    .get(async (req, res, next) => {

        //console.log(req)

        await menu_db.fetchMenu(req.user, (error, result) => {
            if (error) {
                return next(error)
            }


            //    ConstantSourceNode
            //res.send(result)


            const tree = (data, root) => {
                let t = {};
                data.forEach(o => {
                    Object.assign(t[o.key] = t[o.key] || {}, o)

                    let parent = o.parent === null ? undefined : o.parent

                    //                    console.log(o.key + ", " + o.parent)
                    t[parent] = t[parent] || {};
                    t[parent].childs = t[parent].childs || [];
                    t[parent].contentvalues = t[parent].contentvalues || []
                    t[parent].content = t[parent].content || []

                    if (o.isdetail === 0 || o.tipe === 'FORM') {
                        t[parent].contentvalues.push(t[o.key])
                    } else {
                        t[parent].content.push(t[o.key])
                    }

                    t[parent].childs.push(t[o.key])

                });

                return t[root].childs
            }

            const v = tree(result, undefined)

            res.send({ user: req.user, values: v })

        })

    })

module.exports = router