const express = require('express')
let router = express.Router()
const { getCarById, getCarsByMotorId, getCarsByModelId, getCarsByBrandId, getCars, getCarsDBdatas, getCarDBdatasById } = require('../../Controllers/cars/carsC')




router.get('/fk', getCarsDBdatas);

router.get('/fk/:id', getCarDBdatasById);

router.get('', getCars);

router.get('/:id', getCarById);

router.get('/brand/:id', getCarsByBrandId);

router.get('/model/:id', getCarsByModelId);

router.get('/motor/:id', getCarsByMotorId);

router.get('/motor/:name', getCarsByMotorId);





module.exports = router 