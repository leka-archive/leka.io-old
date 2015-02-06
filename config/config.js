var env = process.env.NODE_ENV || 'dev';

var config = {
    dev: {
        port: 3200
    },

    pre: {
        port: 3201
    },

    prod: {
        port: 3202,
    }
};

module.exports = config[env];