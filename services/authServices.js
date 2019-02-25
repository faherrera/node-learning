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

    decodeToken(token){
        const decoded = new Promise(
            (resolve, reject) => {
                try {
                    const payload = jwt.decode(token, config.SECRET_TOKEN);
                        (payload.exp <= moment.unix()) && reject({
                            status:401,
                            message:"El token ha expirado",
                        });
                    resolve(
                        payload.sub
                    );

                } catch (error) {
                    reject({
                        status:500,
                        message: "Ocurrio un error en el servidor"
                    });
                }

            }
        );
        return decoded;
    }
}
module.exports = AuthServices;