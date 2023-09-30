const jwt= require('jsonwebtoken')

const requireAuth = async(req, res, next)=>{
    console.log(req.headers)
next()

}

module.exports= requireAuth