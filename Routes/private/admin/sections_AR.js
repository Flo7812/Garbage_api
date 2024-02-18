const express = require('express')
let router = express.Router()
const { getAllSections, getMainSectionById, getMainSections, addServicesSection, addMainSection, getServicesSectionById, getServicesSections, getAllDeletedSections, trashDeleteServicesSectionById, trashDeleteMainSectionById, restoreServicesSectionById, restorMainSectionById, softDeleteServicesSectionById, softDeleteMainSectionById, updateServicesSectionById, updateMainSectionById } = require('../../../Controllers/sections/sectionsC')


router.get('', getAllSections)

router.get('/main-section', getMainSections);

router.get('/main-section/:id', getMainSectionById);

router.get('/services-section', getServicesSections);

router.get('/services-section/:id', getServicesSectionById);

router.put('/main-section', addMainSection)

router.put('/services-section', addServicesSection)

router.patch('/main-section/:id', updateMainSectionById);

router.patch('/services-section/:id', updateServicesSectionById);

router.delete('/main-section/:id', softDeleteMainSectionById);

router.delete('/services-section/:id', softDeleteServicesSectionById);

router.post('/main-section/:id', restorMainSectionById);

router.post('/services-section/:id', restoreServicesSectionById);

router.delete('/main-section/trash/:id', trashDeleteMainSectionById);

router.delete('/services-section/trash/:id', trashDeleteServicesSectionById);

// get deleted sections /***in progress ***/
router.get('/deleted', getAllDeletedSections); 

module.exports = router