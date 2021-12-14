/*=============================================================================
 |       Author:  Gunadi Rismananda
 |         Dept:  IT - USTP
 |          
 |  Description:  Handling ENTRY POINT API ROUTE dari HTPP Request
 |
 | Dependencies:  express     --> webserver framework 
 |                body-parser --> parsing semua request http menjadi JSON
 |                passport    --> library authentication untuk login. (Login menggunakan JWT)
 |                
 |
 *===========================================================================*/

const express = require('express')
const router = new express.Router()
require('./passport')
const authentication = require('../app_modules/authentication/authentication')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignIn = passport.authenticate('local', { session: false })


/*
 * import route dari setiap menu disini.. 
 */
const cashbank = require('../app_modules/cashbank/')
const menu = require('../app_modules/menu/menu')

router.get('/', requireAuth, function (req, res) {
    // console.log(req)
    res.send(req.user)
})

router.get('/user', requireAuth, function (req, res) {
    // console.log(req)
    res.send(req.user)
})

router.post('/signin', requireSignIn, authentication.signin);
/* router.post('/signup', authentication.signup) */

/*
 * API Entry Point untuk setiap module 
 */
router.use('/cashbank', requireAuth, cashbank)

router.use('/menu', requireAuth, menu)

module.exports = router