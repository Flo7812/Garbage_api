const express = require('express')
let router = express.Router()
const { PageSection, Section } = require('../../DB/Models/index');
const {  } = require('../../Controllers/sections/sectionsC')



//get all sections
router.get('', async(req, res)=>{
    try {
        const sections = await Section.findAll()
        return res.status(200).json({data: sections})
    } catch (error) {
        res.status(500).json({message: "Error Database", error})
    }
})


//get all Sections
router.get('/main-section', (req, res)=>{
    Section.findAll()
        .then(sections => {
            return res.status(200).json({data: sections})
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))    
});

//get a Section by id
router.get('/main-section/:id', (req, res)=>{
    let sectionId = req.params.id
    if(!sectionId){
        return res.status(400).json({message: 'missing id or not id'})
    }
    Section.findByPk(sectionId)
        .then(section => {
            if(section === null){
                return res.status(409).json({message: 'this section doesn\'t exists'})
            }
            return res.status(200).json({data: section})
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))    
});

//get all PageSections
router.get('/services-section', (req, res)=>{
    PageSection.findAll()
        .then(pageSections => {
            return res.status(200).json({data: pageSections})
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))    
});

//get a serviceSection by id
router.get('/services-section/:id',(req, res)=>{
    let pSectionId = req.params.id
    if(!pSectionId){
        return res.status(400).json({message: 'missing id or not id'})
    }
    PageSection.findByPk(pSectionId)
        .then(pageSection => {
            if(pageSection === null){
                return res.status(409).json({message: 'this section doesn\'t exists'})
            }
            return res.status(200).json({data: pageSection})
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))    
});



module.exports = router