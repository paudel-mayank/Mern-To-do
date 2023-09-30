const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const User = require('../schemas/userSchema')

const saltRounds =10;
 const  createToken = (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60
})
 }

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email })

  if (exists !== null) {
    res.status(409).json
      ({
        status: false, code: 409, message:
          "Email already exists"
      })
    }
  else {
    const hash = await bcrypt.hashSync(password, saltRounds);
    // console.log(hash, 'asdf')

    const user = new User({
      email: email,
       password: hash
    })
     await user.save()
      .then(() => res.status(200).json({
        status: true,
        code: 200, message: "User Created Successfully"
      }))
      .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'An error occurred while saving the user' })
      })
  }
}
const login = async (req, res) => {

  const{ email, password } = req.body;
  let exists = await User.findOne({email})
// console.log(exists)
  if(exists === null){
    res.status(402).json({status: false,
       code : 404, message : "Email not Found"})
  }
  else{
    const match =
     await bcrypt.compare(password,
       exists.password);

       if(match){
        const token = createToken(exists._id)
        // res.status(200).json({user,token})
        
        res.status(200).json({
          status: 200,
          message : "Log in Successfull",
          user : exists.email,
          token: token,
        })
       }
       else{
        res.status(403).json({
          status: false,
          message : "Password didnot match", code : 403
        })
       }

  }

  
  




}
module.exports = { signUp, login }