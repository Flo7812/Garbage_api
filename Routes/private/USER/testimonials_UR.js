const express = require('express')
let router = express.Router()
const {Testimony} = require('../../../DB/Models/index')
// const {} = require('../../../Controllers/testimonials/testimonialsC')


//get a testimony
router.get('/:id', (req, res)=>{
    let testimonyId = parseInt(req.params.id)
    if(!testimonyId){
        return res.status(400).json({message: "id parameter missing or not an id"})
    }
    Testimony.findByPk( testimonyId )
    .then(testimony=> {
        if((testimony === null)){
            return res.status(404).json({message: "testimony with this id doesn't exist"})
        }
        TestimonyStatus.findByPk(testimony.status)
            .then(status =>{
                testimony.status = status.ValidateStatus
                return res.json({data: testimony})
            }).catch(e => res.status(500).json({message: "Error Database", error: e}))
    }).catch(e => res.status(500).json({message: "Error Database", error: e}))
});



//Modify a testimony
router.patch('/:id', (req, res)=>{
    let testimonyId = parseInt(req.params.id)
    if(!testimonyId){
        return res.status(400).json({message: "id parameter missing"})
    }
    Testimony.findByPk(testimonyId)
        .then(testimony => {
            if(testimony === null){
                return res.status(404).json({message: `this ${testimonyId} doesn't exist`})
            }
            // control Body
            Testimony.update(req.body, {where : {id: testimonyId}})
                .then(res.json({message: `this testimony : ${req.body.content} author ${req.body.author_first_name} ${req.body.author_last_name} updated`}))
                .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
        })
        .catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//soft delete a testimony
router.delete('/:id', async(req, res)=>{
    let testimonyId = parseInt(req.params.id)
    if(!testimonyId){
        return res.status(400).json({message: "id parameter missing"})
    }
    await Testimony.findByPk(testimonyId)
        .then(testimony=> {
            if(testimony === null){
                return res.status(400).json({message: "testimony already destroyed"})
            }
            if(testimony.deletedBy === null ){
                testimony.deletedBy = '2'
            }
            testimony.destroy()
                .then(() => res.status(204).json({}))
                .catch(e => res.status(500).json({message: "Error Database", error: e}))
    }).catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//restore a soft deleted testimony 
router.post('/:id', async(req, res) => {
    let testimonyId = parseInt(req.params.id)
    if(!testimonyId){
        return res.status(400).json({message: "id parameter missing"})
    }
    await Testimony.findByPk(testimonyId)
        .then(testimony =>{
            if(testimony !== null){
                return res.status(400).json({message: "testimony already exists"})
            }
            Testimony.restore(testimonyId)
                .then(
                    Testimony.findByPk(testimonyId)
                    .then(testimony => {
                        if(testimony !== null){
                            testimony.update({deletedBy : null},{ where:{id : testimonyId}})
                            return res.status(200).json({message : `this testimony id ${testimonyId} restored`})
                        }
                        return res.status(500).json({message: "Error update deletedBy Database", error: e})
                    }).catch(e => res.status(400).json({message: "testimony trash deleted", error: e}))
                ).catch(e => res.status(500).json({message: "Error restor error", error: e}))
        }).catch(e => res.status(500).json({message: "Error Database", error: e}))
});

//trash delete a testimony 
router.delete('/trash/:id', async(req, res)=>{
    let testimonyId = parseInt(req.params.id)
    if(!testimonyId){
        return res.status(400).json({message: "id parameter missing"})
    }
    await Testimony.findByPk(testimonyId)
        .then(testimony=> {
            if(testimony === null){
                return res.status(400).json({message: "testimony already destroyed"})
            }
            testimony.destroy({force: true})
                .then(() => res.status(204).json({}))
                .catch(e => res.status(500).json({message: "Error Database", error: e}))
        }).catch(e => res.status(500).json({message: "Error Database", error: e}))
});
// get deleted testimonials /***in progress ***/
router.get('/deleted', async (req, res) => {
    /*   try {
           // Trouver toutes les voitures soft deleted
           const deletedtestimonys = await testimony.findAll({
               where: { deletedAt: { [Op.ne]: null } } // Sélectionne les lignes avec deletedAt non nul (soft deleted)
           });
           res.json({ deletedtestimonys });
       } catch (error) {
           res.status(500).json({ message: "Erreur de la base de données", error });
       }*/
}); 

module.exports = router