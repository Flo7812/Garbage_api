const  Section  = require('../../DB/Models/Sections/section');
const  sectionPage  = require('../../DB/Models/Sections/sectionPage');


exports.getAllSections = async (req, res)=>{
    try {

        const sections = await MainSection.findAll()
        return res.status(200).json({data: sections})
    } catch (error) {
        res.status(500).json({message: "Error Database", error})
    }
}

exports.getMainSections = async(req, res)=>{
    Section.findAll()
    .then(mainSections => {
        return res.status(200).json({data: mainSections})
    })
    .catch(e => res.status(500).json({message: "Error Database", error: e}))
}

exports.getMainSectionById = async(req, res)=>{
    let mSectionId = req.params.id
    if(!mSectionId){
        return res.status(400).json({message: 'missing id or not id'})
    }
    MainSection.findByPk(mSectionId)
        .then(mainSection => {
            if(mainSection === null){
                return res.status(409).json({message: 'this section doesn\'t exists'})
            }
            return res.status(200).json({data: mainSection})
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))   
}

exports.getServicesSections = (req, res)=>{
    ServicesSection.findAll()
    .then(servicesSections => {
        return res.status(200).json({data: servicesSections})
    })
    .catch(e => res.status(500).json({message: "Error Database", error: e}))  
}

exports.getServicesSectionById = (req, res)=>{
    let sSectionId = req.params.id
    if(!sSectionId){
        return res.status(400).json({message: 'missing id or not id'})
    }
    ServicesSection.findByPk(sSectionId)
        .then(servicesSection => {
            if(servicesSection === null){
                return res.status(409).json({message: 'this section doesn\'t exists'})
            }
            return res.status(200).json({data: servicesSection})
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))    
}

exports.addMainSection = (req, res)=>{
    let {title, content, img, position} = req.body 
    if(!title || !content ){
        return res.status(400).json({message: "Data(s) missing"})
    }
    MainSection.findOne({where: {title : title}, raw: true})
    .then(mSection => {
        if(!!mSection){
            return res.status(409).json({message: `This section title: ${mSection.title} already exists `})
        }
        // Body control ... 
            MainSection.create(req.body)
                .then(mSection => res.json({message: 'Section created', data: mSection}))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
            }).catch(e => res.status(500).json({message: "Error Database", error: e}))   
}

exports.addServicesSection = (req, res)=>{
    let {title, content, img, position} = req.body 
    if(!title || !content ){
        return res.status(400).json({message: "Data(s) missing"})
    }
    ServicesSection.findOne({where : {title : title}, raw: true})
    .then(sSection => {
        if(!!sSection){
            return res.status(409).json({message: `This section title: ${sSection.title} already exists `})
        }
        // Body control ... 
            ServicesSection.create(req.body)
                .then(sSection => res.json({message: 'Section created', data: sSection}))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
            }).catch(e => res.status(500).json({message: "Error Database", error: e})) 
}

exports.updateMainSectionById = (req, res)=>{
    let mSectionId = parseInt(req.params.id)
    if(!mSectionId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    MainSection.findByPk(mSectionId)
        .then(mSection => {
            if(mSection === null){
                return res.status(404).json({message: `this ${mSectionId} doesn't exist`})
            }
            // control Body
            MainSection.update(req.body, {where : {id: mSectionId}})
                .then(res.json({message: `this section: ${req.body.title} updated`}))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
}

exports.updateServicesSectionById = (req, res)=>{
    let sSectionId = parseInt(req.params.id)
    if(!sSectionId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    ServicesSection.findByPk(sSectionId)
        .then(sSection => {
            if(sSection === null){
                return res.status(404).json({message: `this ${sSectionId} doesn't exist`})
            }
            // control Body
            ServicesSection.update(req.body, {where : {id: sSectionId}})
                .then(res.json({message: `this section: ${req.body.title} updated`}))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
}

exports.softDeleteMainSectionById = (req, res)=>{
    let mSectionId = parseInt(req.params.id)
    if(!mSectionId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    MainSection.destroy({where: {id:mSectionId}})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
}

exports.softDeleteServicesSectionById = (req, res)=>{
    let sSectionId = parseInt(req.params.id)
    if(!sSectionId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    ServicesSection.destroy({where: {id:sSectionId}})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
}

exports.restorMainSectionById = (req, res)=>{
    let mSectionId = parseInt(req.params.id)
    if(!mSectionId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    MainSection.restore({where: {id: mSectionId}})
        .then((res.status(200).json({message: `Section ${mSectionId} restored`})))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
}

exports.restoreServicesSectionById = (req, res)=>{
    let sSectionId = parseInt(req.params.id)
    if(!sSectionId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    ServicesSection.restore({where: {id: sSectionId}})
        .then((res.status(200).json({message: `Section ${sSectionId} restored`})))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
}

exports.trashDeleteMainSectionById = (req, res)=>{
    let mSectionId = parseInt(req.params.id)
    if(!mSectionId){
        return res.status(400).json({message: "id parameter missing"})
    }
    MainSection.destroy({where: {id:mSectionId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
}

exports.trashDeleteServicesSectionById = (req, res)=>{
    let sSectionId = parseInt(req.params.id)
    if(!sSectionId){
        return res.status(400).json({message: "id parameter missing"})
    }
    ServicesSection.destroy({where: {id:sSectionId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
}

// get deleted sections /***in progress ***/
exports.getAllDeletedSections = (req, res)=>{
    /*   try {
        // Trouver toutes les voitures soft deleted
        const deletedCars = await Car.findAll({
            where: { deletedAt: { [Op.ne]: null } } // Sélectionne les lignes avec deletedAt non nul (soft deleted)
        });
        res.json({ deletedCars });
    } catch (error) {
        res.status(500).json({ message: "Erreur de la base de données", error });
    }*/
}