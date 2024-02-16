const express = require('express')
let router = express.Router()
const  MainSection  = require('../../../DB/Models/Sections/mainSection');
const  ServicesSection  = require('../../../DB/Models/Sections/mainSection');
const {} = require('../../../Controllers/sections/sectionsC')




//get all sections
router.get('', async(req, res)=>{
    try {
        const sections = []
        const main = await MainSection.findAll()
        const services = await ServicesSection.findAll()
        const datasSection= {
            main,
            services
            }
        sections.push(datasSection)
        return res.status(200).json({data: sections})
    } catch (error) {
        res.status(500).json({message: "Error Database", error})
    }
})


//get all mainSections
router.get('/main-section', (req, res)=>{
    MainSection.findAll()
        .then(mainSections => {
            return res.status(200).json({data: mainSections})
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))    
});

//get a mainSection by id
router.get('/main-section/:id', (req, res)=>{
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
});

//get all servicesSections
router.get('/services-section', (req, res)=>{
    ServicesSection.findAll()
        .then(servicesSections => {
            return res.status(200).json({data: servicesSections})
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))    
});

//get a serviceSection by id
router.get('/services-section/:id', (req, res)=>{
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
});


//add a Main Section
router.put('/main-section', (req, res)=>{
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
})

//add a Service Section
router.put('/services-section', (req, res)=>{
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
})

//Modify a main Section
router.patch('/main-section/:id', (req, res)=>{
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
});

//Modify a services Section
router.patch('/services-section/:id', (req, res)=>{
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
});

//soft delete a main section
router.delete('/main-section/:id', (req, res)=>{
    let mSectionId = parseInt(req.params.id)
    if(!mSectionId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    MainSection.destroy({where: {id:mSectionId}})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//soft delete a services section
router.delete('/services-section/:id', (req, res)=>{
    let sSectionId = parseInt(req.params.id)
    if(!sSectionId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    ServicesSection.destroy({where: {id:sSectionId}})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//restore a soft deleted main-section
router.post('/main-section/:id',  (req, res) => {
    let mSectionId = parseInt(req.params.id)
    if(!mSectionId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    MainSection.restore({where: {id: mSectionId}})
        .then((res.status(200).json({message: `Section ${mSectionId} restored`})))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//restore a soft deleted services-section
router.post('/services-section/:id',  (req, res) => {
    let sSectionId = parseInt(req.params.id)
    if(!sSectionId){
        return res.status(400).json({message: "id parameter missing or not id"})
    }
    ServicesSection.restore({where: {id: sSectionId}})
        .then((res.status(200).json({message: `Section ${sSectionId} restored`})))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//trash delete a main section
router.delete('/main-section/trash/:id',  (req, res)=>{
    let mSectionId = parseInt(req.params.id)
    if(!mSectionId){
        return res.status(400).json({message: "id parameter missing"})
    }
    MainSection.destroy({where: {id:mSectionId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//trash delete a services section
router.delete('/services-section/trash/:id',  (req, res)=>{
    let sSectionId = parseInt(req.params.id)
    if(!sSectionId){
        return res.status(400).json({message: "id parameter missing"})
    }
    ServicesSection.destroy({where: {id:sSectionId}, force: true})
        .then(() => res.status(204).json({}))
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

// get deleted sections /***in progress ***/
router.get('/deleted',  async (req, res) => {
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