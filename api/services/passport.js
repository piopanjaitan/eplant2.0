const passport = require('passport')

const authentication_db = require('../app_modules/authentication/authentication_db')
const config = require('../config/web-config')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const LocalStrategy = require('passport-local')

const localOptions = {
    usernameField: 'loginid',
    passReqToCallback: true
}

const localLogin = new LocalStrategy(localOptions, (req, loginid, password, done) => {
    // verifiy user & pass , call done
    // if true 

    authentication_db.findUser(loginid, (err, user) => {
        if (err) {
            return done(err)
        }

        if (!user) {
            return done(null, false)
        }

        authentication_db.checkUserCompany(loginid, req.body.site, (err, user) => {
            if (err) { return done(err) }

            if (!user) {
                return done(null, false)
            }

            return done(null, user)
        })

        authentication_db.checkPassword(loginid, password, (err, user) => {
            if (err) { return done(err) }

            if (!user) {
                return done(null, false)
            }

            return done(null, user)
        })
    })
})


//setup jwt
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret

}

//jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    //check payload exists
    ////call it done with other
    ////or call done without object
    //console.log(payload)

    authentication_db.findUser(payload.sub, function (err, user) {

        if (err) {
            return done(err, false)
        }

        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
})

// tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)