const express = require('express')
let router = express.Router()
const {addCarById, getDeletedCars, trashDeleteCarById, restoreCarById, softDeleteCarbyId, modifyCarById} = require('../../../Controllers/cars/carsC')

router.get('', (req, res)=>{
    res.send('ici pour manage les voitures')
})

router.put('', addCarById);  

router.patch('/:id', modifyCarById);

router.delete('/:id', softDeleteCarbyId);

router.post('/:id', restoreCarById);

router.delete('/trash/:id', trashDeleteCarById);

// get deleted cars /***in progress ***/
router.get('/deleted', getDeletedCars); 

module.exports = router