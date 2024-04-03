const jwt = require('jwt-simple');
const moment = require('moment');
const dispose = process.env.PATHRR;

exports.createToken = (user) => {
    const payload = {
        sub: user._id,
        name: user.name,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };
    return jwt.encode(payload, dispose);
}