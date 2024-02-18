
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../DB/Models/User/user')


exports.login = (req, res) =>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message: 'email or/and password missing'})
    }
    User.findOne({where: {email : req.body.email}, raw: true})
        .then(user =>{
            if(user === null){
                return res.status(401).json({message: 'This account doesn\'t exist'})
            }
            req.role = user.role // used by the output middleware 
            bcrypt.compare(password, user.password)
                .then(async test =>{
                    if(!test){
                        return res.status(401).json({message: 'Wrong password'})
                    }
                    const token = jwt.sign({
                        id: user.id,
                        last_name: user.last_name,
                        first_name: user.first_name,
                        username: user.username,
                        email: user.email,
                        role: user.role
                    },process.env.JWT_SECRET_SENTENCE, {expiresIn: process.env.JWT_DURING})
<<<<<<< Updated upstream:Controllers/auth/authC.js
                    
                    return res.json({access_token: token})
=======

                    req.body.role = user.role 
                    req.body.name = `${user.first_name} ${user.last_name} `

                    return res.json({message: 'Authorized Access', access_token: token})
>>>>>>> Stashed changes:Controllers/auth/loginC.js
                })
                .catch(e => res.status(500).json({message: 'Check logging failed', error: e}))
        })
        .catch(e => res.status(500).json({message: " Error Database from here ", error: e}))
}