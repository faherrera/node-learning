'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../utils/config');

class AuthServices{

    createToken(user) {
        const payload = {
            sub: user._id, //
            iat: moment().unix(),
            exp: moment().add(14, 'year').unix(),
        }

        return jwt.encode( payload, config.SECRET_TOKEN);
    }
}
module.exports = AuthServices;