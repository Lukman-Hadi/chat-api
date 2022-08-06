const db = require('../models')
const { hashCode } = require('../utils/common')

const User = db.users

const auth = async (req, res) => {
    let id = req.body.userId
    try {
        let user = await User.findByPk(id)
        if (user) {
            let rand = () => Math.random().toString(36).substr(2)
            let token = rand() + rand()
            let hashToken = hashCode(token)
            await user.update({ token: hashToken })
            res.status(200).send(user)
        } else {
            res.status(404).send({
                message: 'User not found',
            })
        }
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Some Error Occur While getting user',
        })
    }
}

module.exports = {
    auth,
}
