const { DataTypes } = require('sequelize');
<<<<<<< Updated upstream
const sequelize = require('../../init/GVPAsequelize');
=======
const sequelize = require('../../Connection/GVP');
>>>>>>> Stashed changes
const bcrypt = require('bcrypt')
const UserRole = require('./userRole')
const makeUsername = require('../../../Utils/makeUsername');
const makeKeyNumber = require('../../../Utils/makeKeyNumber');
const toFirstStrUppC = require('../../../Utils/toFirstStringUpperCase');

const User = sequelize.define('User',{
    
    id:{
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false    
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        },
        unique: true
    },
    date_of_birth:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone:{
        type: DataTypes.INTEGER(10).ZEROFILL,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(64),
        allowNull: false
    },
    role:{
        type: DataTypes.TINYINT, 
        defaultValue: 2,
        allowNull: false
    }
},{
    paranoid: true
});

User.belongsTo(UserRole,{foreignKey: 'role'})
UserRole.hasMany(User,{foreignKey:'role'})


User.add = async function(ln, fn, email, birth, address, phone, password, role, ){
    try {
        // const user = 
        User.create({
            last_name: toFirstStrUppC(ln),
            first_name: toFirstStrUppC(fn),
            username: makeUsername(ln,fn,makeKeyNumber(birth,phone)),
            email: email.toLowerCase(),
            date_of_birth : birth,
            address: address.toLowerCase(),
            phone: phone,
            password: await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT)),
            role: role
        })
        // await User.afterCreate(user)
    } catch (error) {
        console.log({message : 'from user model',error : error});
    }
}   

<<<<<<< Updated upstream
=======
User.afterCreate = (user)=>{
    // make usename key with id?
}

User.beforeUpdate = async function(user){
    
}

>>>>>>> Stashed changes
module.exports = User
// console.log(User === sequelize.models.User);