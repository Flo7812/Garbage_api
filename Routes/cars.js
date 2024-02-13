const express = require('express')
const Car = require('../DB/Models/Car/car')
const Brand = require('../DB/Models/Car/brand')
const Model = require('../DB/Models/Car/model')
const Motor = require('../DB/Models/Car/motor')
let router = express.Router()

router.get('/carsId', (req, res)=>{
    Car.findAll()
        .then(cars => res.json({data: cars}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
})

router.get('/carId/:id', (req, res)=>{
    let carId = parseInt(req.params.id)
    console.log(carId);
    if(!carId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    Car.findByPk( carId )
    .then(car=> {
        if((car === null)){
            return res.status(404).json({message: "Car with this id doesn't exist"})
        }
        console.log({data : car.dataValues});
        return res.json({data: car})
    })
    .catch(e => res.status(500).json({message: "Error Database", error: e})) 
})

router.get('', async (req, res) => {
    try {
        const cars = await Car.findAll()
        const carsData = []
        for (const car of cars) {
            // console.log(car);
            const brand = await Brand.findByPk(car.brand)
            const model = await Model.findByPk(car.model)
            const motor = await Motor.findByPk(car.motor)
            const carData = {
                ...car.dataValues,
                brand: brand.name,
                model: model.name,
                motor: `${motor.type} ${motor.description}`
            }
            // console.log(carData);
            carsData.push(carData);
            // console.log(carsData);
        }
        // console.log(carsData);
        return res.json({ data: carsData })
    } catch (error) {
        res.status(500).json({ message: "Error Database", error })
    }
});


/* router.get('', (req, res)=>{
    // const allcars = []
    Car.findAll()
    .then(carsdata =>{
        carsdata.forEach(car => {
            const cardata = car.dataValues
            Brand.findByPk(car.brand)
            .then(data=>{
                const brand = data.dataValues.name
                cardata.brand = brand
                console.log(brand);
                Model.findByPk(car.dataValues.model)
                .then(data=>{
                    const model = data.dataValues.name
                    console.log(model);
                    cardata.model = model
                    Motor.findByPk(car.dataValues.motor)
                    .then(data=>{
                        const motorType = data.dataValues.type
                        const motorDescription = data.dataValues.description
                        const motor = motorType + ' ' + motorDescription
                        cardata.motor = motor
                        console.log(motor)
                        return res.json({data: allcars})
                    })
                        
                    // res.json({data : carsdata})
                        
                    })
                })
             
        })
        }).catch(e => res.status(500).json({message: "Error Database", error: e}))
    })
 */


router.get('/:id', (req, res)=>{
    let carId = parseInt(req.params.id)
    console.log(carId);
    if(!carId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    Car.findByPk( carId )
    .then(car=> {
        if((car === null)){
            return res.status(404).json({message: "Car with this id doesn't exist"})
        }
        const cardata = car.dataValues
        Brand.findByPk(car.brand)
        .then(data=>{
            console.log(data.name);
            const brand = data.dataValues.name
            cardata.brand = brand
            console.log(brand);
            Model.findByPk(car.dataValues.model)
            .then(data=>{
                const model = data.dataValues.name
                console.log(model);
                cardata.model = model
                Motor.findByPk(car.dataValues.motor)
                .then(data=>{
                    const motorType = data.dataValues.type
                    const motorDescription = data.dataValues.description
                    const motor = motorType + ' ' + motorDescription
                    cardata.motor = motor
                    return res.json({data: cardata})
                })
            })
        })
    }).catch(e => res.status(500).json({message: "Error Database", error: e}))
})


/* router.get('/carbrand/:id', (req, res)=>{
    let brandId = parseInt(req.params.id)
    console.log(brandId);
    if(!brandId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    Car.findByPk( brandId )
    .then(Car=> {
        if((Car === null)){
            return res.status(404).json({message: `this car with this brand id ${brandId} doesn't exist`})
        }
        console.log({data : Car.dataValues});
        return res.json({data: Car})
    })
    .catch(e => res.status(500).json({message: "Error Database", error: e})) 
})
router.get('/brand/:id', (req, res)=>{
    let brandId = parseInt(req.params.id)
    console.log(brandId);
    if(!brandId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    Brand.findByPk( brandId )
    .then(brand=> {
        if((brand === null)){
            return res.status(404).json({message: "this brand doesn't exist"})
        }
        console.log({data : brand.dataValues});
        return res.json({data: brand})
    })
    .catch(e => res.status(500).json({message: "Error Database", error: e})) 
})
 */
//ajout 
router.put('', (req, res)=>{
    let {brand, model, motor, kilometers, initial_registration, seller, createdBy} = req.body 
    if(!brand || !model || !motor || !kilometers || !initial_registration || !seller || !createdBy){
        return res.status(400).json({message: "data(s) missing"})
    }
    Car.findOne({where : {brand: brand, model: model, motor: motor, initial_registration : initial_registration,kilometers : kilometers, seller: seller}, raw: true})
    .then(car => {
        if(car !== null){
            return res.status(409).json({message: `this car : brandId: ${car.brand} modelId:${car.model} already exists `})
        }
            Car.create(req.body)
                .then(Car => res.json({message: 'Car created', data: Car}))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))   
    })
    .catch(e => res.status(500).json({message: "Error Database", error: e}))
})  

//Modification 
router.patch('/:id', (req, res)=>{
    let carId = parseInt(req.params.id)
    if(!carId){
        return res.status(400).json({message: "id parameter missing"})
    }
    Car.findByPk(carId)
        .then(Car => {
            if(Car === null){
                return res.status(404).json({message: `this ${carId} doesn't exist`})
            }
            // control Body
            Car.update(req.body, {where : {id: carId}})
                .then(res.json({message: `this Car: ${req.body.last_name} ${req.body.first_name} updated`}))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
})

//Suppression soft
router.delete('/delete/:id', (req, res)=>{
    let carId = parseInt(req.params.id)
    if(!carId){
        return res.status(400).json({message: "id parameter missing"})
    }
    Car.destroy({where: {id:carId}})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
})

//Retaurer
router.post('/undelete/:id', (req, res) => {
    let carId = parseInt(req.params.id)
    if(!carId){
        return res.status(400).json({message: "id parameter missing"})
    }
    Car.restore({where: {id: carId}})
        .then((res.status(200).json({message: `Car ${req.body.last_name} ${req.body.first_name}restored`})))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
})
// suppression definitive
router.delete('/trashdelete/:id', (req, res)=>{
    let carId = parseInt(req.params.id)
    if(!carId){
        return res.status(400).json({message: "id parameter missing"})
    }
    Car.destroy({where: {id:carId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
})

module.exports = router