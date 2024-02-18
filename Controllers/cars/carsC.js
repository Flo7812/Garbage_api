const { Car, Brand, Model, Motor, Seller} = require('../../DB/Models/index')

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

        
/********public **************/
exports.getCarsDBdatas = (req,res)=>{
    try {
        Car.findAll()
        .then(cars => res.json({data: cars}))
    } catch (error) {
        res.status(500).json({message: "Error Database", error: e})
    }
}

exports.getCarDBdatasById = (req,res)=>{
    let carId = parseInt(req.params.id)
        if(!carId){
            return res.status(400).json({message: "id parameter missing or not id"})
        }
    try {
        Car.findByPk( carId )
        .then(car=> {
            if((car === null)){
                return res.status(404).json({message: `Car with this id: ${car} doesn't exist`})
            }
            console.log({data : car.dataValues});
            return res.json({data: car})
        })
    } catch (error) {
        res.status(500).json({message: "Error Database", error: error})
    }
}

exports.getCardCars = (req,res)=>{
    let carId = parseInt(req.params.id)
        if(!carId){
            return res.status(400).json({message: "id parameter missing or not id"})
        }
    try {
        Car.findByPk( carId )
        .then(car=> {
            if((car === null)){
                return res.status(404).json({message: `Car with this id: ${car} doesn't exist`})
            }
            console.log({data : car.dataValues});
            return res.json({data: car})
        })
    } catch (error) {
        res.status(500).json({message: "Error Database", error: error})
    }
}



exports.getCars = async(req,res)=>{
    try {
        const cars = await Car.findAll()
        reqCarData(cars, res)
    } catch (error) { 
        return res.status(500).json({ message: "Error Database", error })
    }
}

exports.getCarById = async(req,res)=>{
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
}

exports.getCarsByBrandId = async (req,res)=>{
    let brandId = parseInt(req.params.id)
    try {
        if(!brandId){
            return res.status(400).json({message: "id parameter missing or not id"})
        }
        await Brand.findByPk(brandId)
        if(!brandId){
            return res.status(404).json({essage : `Unknow brand id: ${brandId}`})
        }
        const cars = await Car.findAll({where:{ brand: brandId}})
        if(!cars){
            return res.status(404).json({essage : `No cars for this brand id: ${brandId}`})
        }
        reqCarData(cars, res)
    } catch (error) {
        res.status(500).json({ message: "Error Database", error })
    }
}

exports.getCarsByModelId = async(req,res)=>{
    let modelId = parseInt(req.params.id)
    try {
        if(!modelId){
            return res.status(400).json({message: "id parameter missing or not id"})
        }
        await Model.findByPk(modelId)
        if(!modelId){
            return res.status(404).json({message : `Unknow model: ${modelId}`})
        }
        const cars = await Car.findAll({where:{ model: modelId}})
        if(!cars){
            return res.status(404).json({message : `No cars for this model: ${modelId}`})
        }
        reqCarData(cars, res)
    } catch (error) {
        res.status(500).json({ message: "Error Database", error })
    }
}

exports.getCarsByMotorId = async(req,res)=>{
    let motorId = parseInt(req.params.id)
    try {
        if(!motorId){
            return res.status(400).json({message: "id parameter missing or not id"})
        }
        await Motor.findByPk(motorId)
        if(!motorId){
            return res.status(404).json({message : `Unknow motor type id: ${motorId}`})
        }
        const cars = await Car.findAll({where:{ motor: motorId}})
        if(!cars){
            return res.status(404).json({message : `No car with this motor id: ${motorId}`})
        }
        reqCarData(cars, res)
    } catch (error) {
        res.status(500).json({ message: "Error Database", error })
    }
}

exports.getCarsByMotorName = async(req,res)=>{
    let motorName = req.body
    try {
        if(!motorName){
            return res.status(400).json({message: " parameter missing "})
        }
        const motor = await Motor.findOne({where:{name : motorName}})
        if(motor === null){
            return res.status(404).json({message : `Unknow motor type: ${motorName}`})
        }
        const motorId = motor.id
        const cars = await Car.findAll({where:{ id: motorId}})
        if(cars === null){
            return res.status(404).json({message : `No car with this motor: ${motorName}`})
        }
        reqCarData(cars, res)
    } catch (error) {
        res.status(500).json({ message: "Error Database", error })
    }
}
/********private **************/
exports.addCar = (req,res)=>{
    try {
        req.body.createdBy = req.id 
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
                    .then(Car => res.json({message: 'Car created', data: Car, by: req.username}))
                    .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))   
        })
    } catch (error) {
        res.status(500).json({message: "Error Database", error: error})
    }

}

exports.modifyCarById = async(req,res)=>{
    try {
        let carId = parseInt(req.params.id)
        if(!carId){
            return res.status(400).json({message: "id parameter missing"})
        }
        console.log(req.body.brand, req.body.model, req.body.motor,);
        Car.findByPk(carId)
            .then(async car => {
                if(car === null){
                    return res.status(404).json({message: `this ${carId} doesn't exist`})
                }
                if(req.body.brand){
                    // const brand = await Brand.findByPk(req.body.model)
                    req.body.brand.toLowerCase() = await Brand.getIdByName(req.body.brand)
                }
                if(req.body.model){
                    const model = await Model.findOne({where:{name:req.body.model}})
                    req.body.model.toLowerCase() = model.id
                }
                if(req.body.motor){
                    const motor = await Motor.findOne({where:{type:req.body.motor}})
                    req.body.motor.toLowerCase() = motor.id
                }
                const seller = await Seller.findOne({where:{last_name : req.body.seller}})
                req.body.seller = seller.id
                // control Body
                await Car.update(req.body, {where : {id: carId}})
                    .then(res.json({message: `this Car: brand id :${req.body.brand} model id:${req.body.model} updated`,by: req.username}))
                    .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
            })
    } catch (error) {
        res.status(500).json({message: "Error Database", error: error})
    }
}

exports.softDeleteCarById = async(req,res)=>{
    try {
        req.body.deletedBy = req.id
        let carId = parseInt(req.params.id)
        if(!carId){
            return res.status(400).json({message: "id parameter missing"})
        }
        await Car.findByPk(carId)
            .then(async(car)=> {
                if(car === null){
                    return res.status(400).json({message: "car already destroyed"})
                }
                if(car.deletedBy === null ){
                    car.deletedBy = req.body.deletedBy
                }
                await car.destroy()
                    .then(() => res.status(204).json({}))
                    .catch(e => res.status(500).json({message: "Error Database", error: e}))
            })
    } catch (error) {
        res.status(500).json({message: "Error Database", error: error})
    }
}

exports.restoreCarById = async(req,res)=>{
    try {
        let carId = parseInt(req.params.id)
    if(!carId){
        return res.status(400).json({message: "id parameter missing"})
    }
    await Car.findByPk(carId)
        .then(async(car) =>{
            if(car !== null){
                return res.status(400).json({message: "car already exists"})
            }
            await Car.restore(carId)
                .then(async()=>{
                    await Car.findByPk(carId)
                    .then(async(car) => {
                        if(car !== null){
                            await Car.update({deletedBy : null},{ where:{id : carId}})
                            return res.status(200).json({message : `this car id ${carId} restored`})
                        }
                        res.status(500).json({message: "Error update deletedBy Database", error: e})
                    }).catch(e => res.status(400).json({message: "car trash deleted", error: e}))
                }).catch(e => res.status(500).json({message: "Error restor error", error: e}))
        })
    } catch (error) {
        res.status(500).json({message: "Error Database", error: error})
    }
}

exports.trashDeleteCarById = async(req,res)=>{
    try {
        let carId = parseInt(req.params.id)
        if(!carId){
            return res.status(400).json({message: "id parameter missing"})
        }
        await Car.findByPk(carId)
            .then(async(car)=> {
                if(car === null){
                    return res.status(400).json({message: "car already destroyed"})
                }
            await car.destroy( {force: true})
                .then(() => res.status(204).json({}))
                .catch(e => res.status(500).json({message: "Error Database", error: e}))
        })
    } catch (error) {
        res.status(500).json({message: "Error Database", error: error})
    }
}

// get deleted cars /***in progress ***/
exports.getDeletedCars = (req,res)=>{

}




