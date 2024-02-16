const express = require('express')
let router = express.Router()
const {addCar, getDeletedCars, trashDeleteCarById, restoreCarById, softDeleteCarById, modifyCarById} = require('../../../Controllers/cars/carsC')

router.get('', (req, res)=>{
    res.send('ici pour manage les voitures')
})

router.put('', addCar);  

router.patch('/:id', modifyCarById);

router.delete('/:id', softDeleteCarById);

router.post('/:id', restoreCarById);

router.delete('/trash/:id', trashDeleteCarById);

// get deleted cars /***in progress ***/
router.get('/deleted', getDeletedCars); 

module.exports = router