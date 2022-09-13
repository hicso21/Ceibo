
const { validateToken } = require('../config/tokens')

async function validateAuth(req, res, next) {
    const token = req.cookies.token
    if (!token) return res.sendStatus(401)
    const foundation = validateToken(token)
    if (!foundation) return res.sendStatus(401)
    req.foundation = foundation
    next()
}

module.exports = { validateAuth }