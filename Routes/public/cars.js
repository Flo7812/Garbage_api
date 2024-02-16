const express = require('express')
let router = express.Router()
const { getCarbyId, getCarsByMotorId, getCarsByModelId, getCarsByBrandId, getCars, getCarsDBdatas, getCarDBdatabyId, getBrands, getBrandById } = require('../../Controllers/cars/carsC')



//get all cars with int datas (foreignKeys)
router.get('/fk', getCarsDBdatas);

//get car with int datas (foreignKeys)
router.get('/fk/:id', getCarDBdatabyId);

router.get('/brand', getBrands);

router.get('/brand/:id', getBrandById);

router.get('/brand/:id', getCarsByBrandId);

router.get('/model/:id', getCarsByModelId);

router.get('/motor/:id', getCarsByMotorId);

router.get('', getCars);

router.get('/:id', getCarbyId);

module.exports = router 