const express = require('express')
const bcrypt  = require('bcrypt')
const { User } = require('../DB/Models/index')
let router = express.Router()

// get all users
router.get('', (req, res)=>{
    User.findAll()
        .then(users => res.json({data: users}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

// get an user
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
    }).catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//add an user
router.put('', (req, res)=>{
    const {last_name, first_name, username, email, date_of_birth, address, password} = req.body 
    if(!last_name || !first_name || !username || !email || !date_of_birth || !address || !password){
        return res.status(400).json({message: "data(s) missing"})
    }
    User.findOne({where : {email : email}, raw: true})
    .then(user => {
        if(!!user){
            return res.status(409).json({message: `this user : ${user.last_name} ${user.first_name} already exists `})
        }
        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT) )
            .then( hash => {
                req.body.password = hash
                console.log(req.body);
        // Body control ... 
            User.create(req.body)
                .then(user => res.json({message: 'user created', data: user}))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
            }).catch(e => res.status(500).json({message: "Hash process error", error: e}))       
    }).catch(e => res.status(500).json({message: "Error Database", error: e}))
});  

//Modify an user
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
});

//soft delete an user
router.delete('/:id', (req, res)=>{
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message: "id parameter missing"})
    }
    User.destroy({where: {id:userId}})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//restore a soft deleted user
router.post('/:id', (req, res) => {
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message: "id parameter missing"})
    }
    User.restore({where: {id: userId}})
        .then((res.status(200).json({message: `User id ${userId} restored`})))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//trash delete an user
router.delete('/trash/:id', (req, res)=>{
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message: "id parameter missing"})
    }
    User.destroy({where: {id:userId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

// get deleted users /***in progress ***/
router.get('/deleted', async (req, res) => {
    /*   try {
           // Trouver toutes les voitures soft deleted
           const deletedCars = await Car.findAll({
               where: { deletedAt: { [Op.ne]: null } } // Sélectionne les lignes avec deletedAt non nul (soft deleted)
           });
           res.json({ deletedCars });
       } catch (error) {
           res.status(500).json({ message: "Erreur de la base de données", error });
       }*/
}); 

module.exports = router