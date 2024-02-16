const bcrypt  = require('bcrypt')
const { User, UserRole } = require('../../DB/Models/index')

exports.getUsers = async(req, res)=>{
    try {
        const users = await User.findAll()
            if((users === null)){
                return res.status(404).json({message: "Nobody exist so who's making this search?"})
            }
            const allUsers = []
            for (const user of users) {
                console.log(user.role);
                    const userRole = await UserRole.findByPk(user.role)
                    const userDatas = {
                        ...user.dataValues,
                        role : userRole.role
                    }
                    allUsers.push(userDatas)
                }
                return res.json({data: allUsers})
        } catch (error) {
        res.status(500).json({message: "Error UserRole Database", error: error})
    }
}

exports.getUserById = (req, res)=>{
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    User.findByPk( userId )
    .then(user=> {
        if((user === null)){
            return res.status(404).json({message: "user with this id doesn't exist"})
        }
        UserRole.findByPk(user.role)
            .then((role)=>{
                user.role = role.role
                return res.json({data: user})
            }
        ).catch(e => res.status(500).json({message: "Error UserRole Database", error: e}))
    }).catch(e => res.status(500).json({message: "Error Database", error: e}))
}

exports.addUser = (req, res)=>{
    if(req.role !== 1){
        return res.status(401).json({message: 'Unauthorized user'})
    }
    const {last_name, first_name, username, email, date_of_birth, address, phone, password} = req.body 
    if(!last_name || !first_name || !username || !email || !date_of_birth || !phone ||!address || !password){
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
        // Body control ... 
            User.create(req.body)
                .then(user => res.json({message: 'user created', data: user, by: req.token.username }))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
            }).catch(e => res.status(500).json({message: "Hash process error", error: e}))       
    }).catch(e => res.status(500).json({message: "Error Database", error: e}))
}

exports.modifyUserById = async(req, res)=>{
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message: "id parameter missing"})
    }
    await User.findByPk(userId)
        .then(async user => {
            if(user === null){
                return res.status(404).json({message: `this ${userId} doesn't exist`})
            }
            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT) )
            }
            await User.update(req.body, {where : {id: userId}})
            .then(res.json({message: `this User: ${req.body.last_name} ${req.body.first_name} updated`}))
            .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
        })
        .catch((e) => res.status(500).json({message: "Error Database", error: e}))
}

exports.softDeleteUseById = (req, res)=>{
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message: "id parameter missing"})
    }
    User.destroy({where: {id:userId}})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
}

exports.restoreUserById = async(req, res)=>{
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message: "id parameter missing"})
    }
    await User.findByPk(userId)
        .then(user => {
            if(!!user){
                return res.status(409).json({message : 'User actualy not destroyed, can\'t restore him'})
            }
            User.restore({where: {id: userId}})
            .then((res.status(200).json({message: `User id ${userId} restored`})))
            .catch(e => res.status(500).json({message: "Error Database to restore", error: e}))
        }).catch(e =>res.status(500).json({message: "Error control if user already exists", error: e}))
}

exports.trashDeleteUserById = (req, res)=>{
    if(req.role !== 1){
        return res.status(401).json({message: 'Unauthorized user'})
    }
    let userId = parseInt(req.params.id)
    if(!userId){
        return res.status(400).json({message: "id parameter missing"})
    }
    User.destroy({where: {id:userId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
}

// get deleted users /***in progress ***/
exports.getDeletedUsers = (req, res)=>{
    /*   try {
           const deletedUsers = await User.findAll({
               where: { deletedAt: { [Op.ne]: null } } // Sélectionne les lignes avec deletedAt non nul (soft deleted)
           });
           res.json({ deletedUsers });
       } catch (error) {
           res.status(500).json({ message: "Erreur de la base de données", error });
       }*/
}
