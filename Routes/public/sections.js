const express = require('express')
let router = express.Router()
const { PageSection, Section } = require('../../DB/Models/index');
const {  } = require('../../Controllers/sections/sectionsC')



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
router.get('/services-section/:id',(req, res)=>{
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



module.exports = router