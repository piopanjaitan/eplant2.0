module.exports = {
    appsPool: {
        user: 'EPMSAPPS',
        password: 'EPMSAPPS',
        connectString: process.env.CONNECTIONSTRING
    },
    gcmPool: {
        user: 'EPMS_GCM',
        password: 'EPMS',
        connectString: process.env.CONNECTIONSTRING
    },
    smgPool: {
        user: 'EPMS_SMG',
        password: 'EPMS',
        connectString: process.env.CONNECTIONSTRING
    },
    sbePool: {
        user: 'EPMS_SBE',
        password: 'EPMS',
        connectString: process.env.CONNECTIONSTRING
    },
    slmPool: {
        user: 'EPMS_SLM',
        password: 'EPMS',
        connectString: process.env.CONNECTIONSTRING
    },
    sjePool: {
        user: 'EPMS_SJE',
        password: 'EPMS',
        connectString: process.env.CONNECTIONSTRING
    },
    usPool: {
        user: 'EPMS_USTP',
        password: 'EPMS',
        connectString: process.env.CONNECTIONSTRING
    },
    jwtSecretKey: process.env.JWT_KEY
};