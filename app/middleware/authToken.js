const db = require('../models')
const User = db.users

const requestToken = async (req, res, next) => {
    if (req.path === 'api/auth' || req.path === '/api/auth') {
        next()
    } else {
        let token = req.get('Authorization')
        if (!token) {
            return res.status(403).send({
                message: 'Not Authorized',
            })
        }
        try {
            let user = await User.findOne({ where: { token } })
            if (user) {
                req.userId = user.id
                next()
            } else {
                res.status(403).send({
                    message: 'Not Authorized',
                })
            }
        } catch (err) {
            res.status(500).send({
                message: err.message || 'Some Error Occur While getting user',
            })
        }
    }
}

module.exports = {
    requestToken,
}
