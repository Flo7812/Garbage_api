const express = require('express')
const { Car, Brand, Model, Motor} = require('../DB/Models/index')
let router = express.Router()

const jwtAuthGuard = require('../Middleware/in/jwtAuthGuard')

//function to get brand, model and motor name from their own tables
async function reqCarData(cars, res){
    const carsData = []
    for (const car of cars) {
        const brand = await Brand.findByPk(car.brand)
        const model = await Model.findByPk(car.model)
        const motor = await Motor.findByPk(car.motor)
        const carData = {
            ...car.dataValues,
            brand: brand.name,
            model: model.name,
            motor: `${motor.type} ${motor.description}`
        }
        carsData.push(carData);
    }
    return res.status(200).json({ data: carsData })
}

//get all cars with int datas (foreignKeys)
router.get('/fk', (req, res)=>{
    Car.findAll()
        .then(cars => res.json({data: cars}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//get car with int datas (foreignKeys)
router.get('/fk/:id', (req, res)=>{
    let carId = parseInt(req.params.id)
    console.log(carId);
    if(!carId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    Car.findByPk( carId )
    .then(car=> {
        if((car === null)){
            return res.status(404).json({message: `Car with this id: ${car} doesn't exist`})
        }
        console.log({data : car.dataValues});
        return res.json({data: car})
    })
    .catch(e => res.status(500).json({message: "Error Database", error: e})) 
});

//get all cars with string datas 
router.get('', async (req, res) => {
    try {
        const cars = await Car.findAll()
        reqCarData(cars, res)
    } catch (error) {
        res.status(500).json({ message: "Error Database", error })
    }
});

//get car with string datas 
router.get('/:id', async (req, res) => {
    let carId = parseInt(req.params.id)
    if(!carId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    try {
        const car = await Car.findByPk(carId)
        if(car === null){
            return res.status(404).json({message: `Car with this id: ${car} doesn't exist`})
        }
        const brand = await Brand.findByPk(car.brand)
        const model = await Model.findByPk(car.model)
        const motor = await Motor.findByPk(car.motor)
        car.brand = brand.name
        car.model = model.name
        car.motor =`${motor.type} ${motor.description}`
        return res.json({ data: car })
    } catch (error) {
        res.status(500).json({ message: "Error Database", error })
    }
});

// get car(s) by brand (id)
router.get('/brand/:id', async (req, res)=>{
    let brandId = parseInt(req.params.id)
    try {
        if(!brandId){
            return res.status(400).json({message: "id parameter missing or not id"})
        }
        await Brand.findByPk(brandId)
        if(brandId === null){
            return res.status(404).json({essage : `Unknow brand: ${brandId}`})
        }
        const cars = await Car.findAll({where:{ brand: brandId}})
        if( cars=== null){
            return res.status(404).json({essage : `No cars for this brand: ${brandId}`})
        }
        reqCarData(cars, res)
    } catch (error) {
        res.status(500).json({ message: "Error Database", error })
    }
});

// get car(s) by model (id)
router.get('/model/:id', async (req, res)=>{
    let modelId = parseInt(req.params.id)
    try {
        if(!modelId){
            return res.status(400).json({message: "id parameter missing or not id"})
        }
        await Model.findByPk(modelId)
        if(modelId === null){
            return res.status(404).json({essage : `Unknow model: ${modelId}`})
        }
        const cars = await Car.findAll({where:{ model: modelId}})
        if(cars === null){
            return res.status(404).json({essage : `No cars for this model: ${modelId}`})
        }
        reqCarData(cars, res)
    } catch (error) {
        res.status(500).json({ message: "Error Database", error })
    }
});

// get car(s) by motor (id)
router.get('/motor/:id', async (req, res)=>{
    let motorId = parseInt(req.params.id)
    try {
        if(!motorId){
            return res.status(400).json({message: "id parameter missing or not id"})
        }
        await Brand.findByPk(motorId)
        if(motorId === null){
            return res.status(404).json({essage : `Unknow motor type: ${motorId}`})
        }
        const cars = await Car.findAll({where:{ motor: motorId}})
        if(cars === null){
            return res.status(404).json({essage : `No car with this motor: ${motorId}`})
        }
        reqCarData(cars, res)
    } catch (error) {
        res.status(500).json({ message: "Error Database", error })
    }
});

//add a new car
router.put('', jwtAuthGuard, (req, res)=>{
    let {brand, model, motor, kilometers, initial_registration, seller, createdBy} = req.body 
    if(!brand || !model || !motor || !kilometers || !initial_registration || !seller || !createdBy){
        return res.status(400).json({message: "data(s) missing"})
    }
    Car.findOne({where : {brand: brand, model: model, motor: motor, initial_registration : initial_registration,kilometers : kilometers, seller: seller}, raw: true})
    .then(car => {
        if(!!car){
            return res.status(409).json({message: `this car : brandId: ${car.brand} modelId:${car.model} already exists `})
        }
            Car.create(req.body)
                .then(Car => res.json({message: 'Car created', data: Car}))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))   
    })
    .catch(e => res.status(500).json({message: "Error Database", error: e}))
});  

//modify a car
router.patch('/:id', jwtAuthGuard, (req, res)=>{
    let carId = parseInt(req.params.id)
    if(!carId){
        return res.status(400).json({message: "id parameter missing"})
    }
    Car.findByPk(carId)
        .then(car => {
            if(car === null){
                return res.status(404).json({message: `this ${carId} doesn't exist`})
            }
            // control Body
            Car.update(req.body, {where : {id: carId}})
                .then(res.json({message: `this Car: brand id :${req.body.brand} model id:${req.body.model} updated`}))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//soft delete a car
router.delete('/:id', jwtAuthGuard, async(req, res)=>{
    let carId = parseInt(req.params.id)
    if(!carId){
        return res.status(400).json({message: "id parameter missing"})
    }
    await Car.findByPk(carId)
        .then(car=> {
            if(car === null){
                return res.status(400).json({message: "car already destroyed"})
            }
            if(car.deletedBy === null ){
                car.deletedBy = '2'
            }
            car.destroy()
                .then(() => res.status(204).json({}))
                .catch(e => res.status(500).json({message: "Error Database", error: e}))
}).catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//restore a soft deleted car
router.post('/:id', jwtAuthGuard, async(req, res) => {
    let carId = parseInt(req.params.id)
    if(!carId){
        return res.status(400).json({message: "id parameter missing"})
    }
    await Car.findByPk(carId)
        .then(car =>{
            if(car !== null){
                return res.status(400).json({message: "car already exists"})
            }
            Car.restore(carId)
                .then(
                    Car.findByPk(carId)
                    .then(car => {
                        if(car !== null){
                            Car.update({deletedBy : null},{ where:{id : carId}})
                            return res.status(200).json({message : `this car id ${carId} restored`})
                        }
                        return res.status(500).json({message: "Error update deletedBy Database", error: e})
                    }).catch(e => res.status(400).json({message: "car trash deleted", error: e}))
                ).catch(e => res.status(500).json({message: "Error restor error", error: e}))
        }).catch(e => res.status(500).json({message: "Error Database", error: e}))
});

// trash delete a car
router.delete('/trash/:id', jwtAuthGuard, async(req, res)=>{
    let carId = parseInt(req.params.id)
    if(!carId){
        return res.status(400).json({message: "id parameter missing"})
    }
    await Car.findByPk(carId)
        .then(car=> {
            if(car === null){
                return res.status(400).json({message: "car already destroyed"})
            }
            car.destroy( {force: true})
                .then(() => res.status(204).json({}))
                .catch(e => res.status(500).json({message: "Error Database", error: e}))
        }).catch(e => res.status(500).json({message: "Error Database", error: e}))
});

// get deleted cars /***in progress ***/
router.get('/deleted', jwtAuthGuard, async (req, res) => {
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