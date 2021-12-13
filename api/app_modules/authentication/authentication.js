const jwt = require('jwt-simple')
const jsonwebtoken = require('jsonwebtoken')
const config = require('../../config/web-config')


const tokenForUser = (user) => {
    const timeStamp = new Date().getTime()

    // console.log(user)

    //    return jwt.encode({ sub: user.loginid, site: user.site, iat: timeStamp }, config.secret)

    return jsonwebtoken.sign({ sub: user.loginid, site: user.site, iat: timeStamp }, config.secret, { expiresIn: '1m' })
}

exports.signin = (req, res, next) => {
    // user already in database 
    // return token

    if (!res.headersSent) // if doesn't sent yet
        res.json({ token: tokenForUser(req.body) })

}