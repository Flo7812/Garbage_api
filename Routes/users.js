// require('dotenv').config({path:'../.env'}) // packagejson = -r dotenv/config
const express = require('express')
const bcrypt  = require('bcrypt')
const User = require('../DB/Models/User/user')
let router = express.Router()


router.get('', (req, res)=>{
    User.findAll()
        .then(users => res.json({data: users}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
})


router.get('/:id', (req, res)=>{
    let userId = parseInt(req.params.id)
    console.log(userId);
    if(!userId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    User.findByPk( userId )
    .then(user=> {
        if((user === null)){
            return res.status(404).json({message: "user with this id doesn't exist"})
        }
        console.log({data : user.dataValues});
        return res.json({data: user})
    })
    .catch(e => res.status(500).json({message: "Error Database", error: e}))
/*     if(!userId){
        return res.status(400).json({message: "id parameter missing"})
    }
    User.findOne()
    .then(user => {
            if((user === null)){
                return res.status(404).json({message: "user with this id doesn't exist"})
            }
            return res.json({data: user})
        })
    .catch(e => res.status(500).json({message: "Error Database", error: e})) */
})

//ajout 
router.put('', (req, res)=>{
    let {last_name, first_name, username, email, date_of_birth, address, password} = req.body 
    if(!last_name || !first_name || !username || !email || !date_of_birth || !address || !password){
        return res.status(400).json({message: "data(s) missing"})
    }
    User.findOne({where : {email : email}, raw: true})
    .then(user => {
        if(user !== null){
            return res.status(409).json({message: `this user : ${user.last_name} ${user.first_name} already exists `})
        }
        /* console.log(typeof process.env.BCRYPT_SALT);
        bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT))
        .then(salt => {
            bcrypt.hash(password, salt)
            .then(hash =>{
                req.body.password = hash
                console.log(req.body)
                User.create(req.body)
                    .then(user => res.json({message: 'user created', data: user}))
                    .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
            }).catch(e => res.status(500).json({message: "Hash process error", error: e}))
        }).catch(e => res.status(500).json({message: "Salt process error", error: e}))
    }).catch(e => res.status(500).json({message: "Error Database", error: e}))     
})   */
        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT) )
            .then( hash => {
                req.body.password = hash
                console.log(req.body);
        // Body control ... 
            User.create(req.body)
                .then(user => res.json({message: 'user created', data: user}))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
            })
            .catch(e => res.status(500).json({message: "Hash process error", error: e}))       
    })
    .catch(e => res.status(500).json({message: "Error Database", error: e}))
})  

//Modification 
router.patch('/:id', (req, res)=>{
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message: "id parameter missing"})
    }
    User.findByPk(userId)
        .then(user => {
            if(user === null){
                return res.status(404).json({message: `this ${userId} doesn't exist`})
            }
            // control Body
            User.update(req.body, {where : {id: userId}})
                .then(res.json({message: `this User: ${req.body.last_name} ${req.body.first_name} updated`}))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
})

//Suppression soft
router.delete('/delete/:id', (req, res)=>{
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message: "id parameter missing"})
    }
    User.destroy({where: {id:userId}})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
})

//Retaurer
router.post('/undelete/:id', (req, res) => {
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message: "id parameter missing"})
    }
    User.restore({where: {id: userId}})
        .then((res.status(200).json({message: `User ${req.body.last_name} ${req.body.first_name}restored`})))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
})
// suppression definitive
router.delete('/trashdelete/:id', (req, res)=>{
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message: "id parameter missing"})
    }
    User.destroy({where: {id:userId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
})

module.exports = router