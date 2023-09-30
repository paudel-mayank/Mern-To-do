const jwt = require('jsonwebtoken')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ status: false, message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(authorization, process.env.JWT_SECRET)
        // console.log(decoded, 'dsssssssssssssssssss')
        req.user = decoded
        req.token = authorization
        next()
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })


    }



}

module.exports = requireAuth