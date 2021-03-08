const jwt = require('jsonwebtoken');
const config = require('../../config/config');

function authToken(req, res, next) {
    const header = req.headers['authorization'];
    let token = header && header.split(' ')[1];
    if (token == null) return res.sendStatus(404);

    console.log(token);
    jwt.verify(token, config.jwtSecert, (err, user) => {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

module.exports = authToken;