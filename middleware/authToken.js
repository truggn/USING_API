const jwt = require('jsonwebtoken')
const _CONF = require('../config/secret')

function authToken(req, res, next) {
    const token = req.headers.cookie.slice(6)
    console.log(token)
    if(!token) return res.status(401).redirect('/login-page')// check ko có cookie thì quay lại trang login
    try {
        const verifiToken = jwt.verify(token, _CONF.secret )
        req.user = verifiToken;
        next();
    } catch (error) {
        return res.status(400).redirect('/login-page')
    }
}
module.exports = authToken;
