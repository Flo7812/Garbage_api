const express = require('express')
let router = express.Router()
const { getUsers, getUserById, addUser, modifyUserbyId, softDeleteUseById, restoreUserById, trashDeleteUserbyId, getDeletedUsers } = require('../../../Controllers/users/usersC')
const {} = require('../../../Controllers/sections/sectionsC')
const {} = require('../../../Controllers/sections/shedulesC')

router.get('', getUsers)

router.get('/:id', getUserById)

router.put('', addUser)  

router.patch('/:id', modifyUserbyId)

router.delete('/:id', softDeleteUseById)

router.post('/:id', restoreUserById)

router.delete('/trash/:id', trashDeleteUserbyId)

// get deleted users /***in progress ***/
router.get('/deleted' , getDeletedUsers)

module.exports = router