const webServer = require('../api/services/webServer')


const startup = async () => {
    // do something

    console.log('Starting application');

    try {
        console.log('Initializing database modules')

        //await database_h.initialize(dbConfig.eplantPool);
        //        await database.initialize(dbConfig.eplantPoolx);
    } catch (err) {
        console.error(err);
        process.exit(1); // Non-zero failure code
    }

    try {
        console.log('Initializing web server modules')

        await webServer.initialize()
    } catch (err) {
        console.error(err);

        process.exit(1); // Non-zero failure code
    }

    console.log('Application Started ..')
}

startup()

const shutdown = async (e) => {
    let err = e

    console.log('Shutting down application')

    try {
        console.log('Closing web server module')
        await webServer.closed()
        console.log('Closing web server module Done')
    } catch (e) {
        console.error(e)

        err = err || e;
    }

    console.log('Exiting process')

    if (err) {
        process.exit(1)// Non-zero failure code
    } else {
        process.exit(0)
    }
}

process.on('SIGTERM', () => {
    console.log('Received SIGTERM');

    shutdown()
});

process.on('SIGINT', () => {
    console.log('Received SIGINT');

    shutdown()
});

process.on('uncaughtException', err => {
    console.log('Uncaught exception')
    console.error(err)

    shutdown(err)
});