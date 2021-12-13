/*=============================================================================
 |       Author:  Gunadi Rismananda
 |         Dept:  IT - USTP
 |          
 |  Description:  Handling Express Webserver on node js 
 |
 | Dependencies:  express     --> webserver framework 
 |                body-parser --> parsing semua request http menjadi JSON
 |                morgan      --> Untuk Logging HTTP Traffic.                  
 |                
 |
 *===========================================================================*/

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')

const morgan = require('morgan')
var session = require('express-session')
const cors = require('cors')

const passport = require('passport')

//local dependencies
const webServerConfig = require('../config/web-config.js')
const router = require('./router')

const regexIso8601 = '/(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/'
let httpServer



initialize = () => {
    return new Promise((resolve, reject) => {
        const app = express()
        httpServer = http.createServer(app)

        app.use(bodyParser.json({ reviver: reviveDates }))
        app.use(morgan('combined'))
        app.use(handleUnexpectedError)
        app.use(cors())
        app.use(express.json());
        app.use(express.urlencoded({
            extended: true
        }));


        app.use(cookieParser())
        app.use(passport.initialize());
        app.set('trust proxy', true);
        app.set('trust proxy', 'loopback') // specify a single subnet
        app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
        app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
        app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array
        app.use('/api', router)


        httpServer.listen(webServerConfig.port)
            .on('listening', () => {
                console.log(`Web server listening on localhost PORT:${webServerConfig.port}`);
                console.log(`Path : ${__dirname}`);

                resolve()
            })
            .on('error', err => {
                reject(err)
            })
    })
}

closed = () => {
    return new Promise((resolve, reject) => {

        Object.keys(socketMap).forEach(function (socketKey) {
            socketMap[socketKey].destroy();
        });

        httpServer.close((err) => {
            if (err) {
                reject(err)
                return
            }

            resolve()
        });
    });
}


handleUnexpectedError = (err, req, res, next) => {
    console.log('An Unexpected error happen', err)
    res.status(500).send({ result: 'error', message: `An errror has occrued contact your wizards  ${err}`, request: req.body })

}

reviveDates = (key, value) => {
    var match;
    if (typeof value === "string" && (match = value.match(regexIso8601))) {
        var milliseconds = Date.parse(match[0]);
        if (!isNaN(milliseconds)) {
            return new Date(milliseconds)
        }
    }
    return value
}

module.exports.initialize = initialize
module.exports.closed = closed