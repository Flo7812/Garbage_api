const express = require('express')
let router = express.Router()
const car_router = require('./car')
const { getCarById, getCarsByMotorId, getCarsByModelId, getCarsByBrandId, getCars } = require('../../Controllers/cars/carsC')



router.use('/car', car_router)


router.get('', getCars);

router.get('/:id', getCarById);

router.get('/brand/:id', getCarsByBrandId);

router.get('/model/:id', getCarsByModelId);

router.get('/motor/:id', getCarsByMotorId);

router.get('/motor/:name', getCarsByMotorId);





module.exports = router 