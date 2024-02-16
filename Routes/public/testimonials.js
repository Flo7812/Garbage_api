const express = require('express')
let router = express.Router()
const { Testimony, TestimonyStatus } = require('../../DB/Models');


//get all testimonials
router.get('', async(req, res)=>{
    try{
        const testimonials = await Testimony.findAll()
        const allTestimonials = []
        for (const testimony of testimonials) {
            const status = await TestimonyStatus.findByPk(testimony.status)
            const testimonyDatas = {
                ...testimony.dataValues,
                status: status.ValidateStatus
                }
                allTestimonials.push(testimonyDatas)
            }return res.json({data: allTestimonials})
    }catch(error){
        res.status(500).json({message: "Error Database", error})
    }
})      
//add a testimony
router.put('',  (req, res)=>{
    let {author_last_name, author_first_name, author_email, content, validator} = req.body 
    if(!author_last_name || !author_first_name || !author_email || !content){
        return res.status(400).json({message: "data(s) missing"})
    }
    Testimony.findOne({where : {author_email : author_email}, raw: true})
    .then(testimony => {
        if(!!testimony){
            return res.status(409).json({message: `this testimony : ${testimony.content} author ${testimony.author_first_name} ${testimony.author_last_name} already exists `})
        }
        // Body control ... 
        Testimony.create(req.body)
            .then(testimony => res.json({message: 'testimony created', data: testimony}))
            .catch(e => res.status(500).json({message: "Error Database if body content checked", error: e}))
        }).catch(e => res.status(500).json({message: "Error Database", error: e}))     
})


module.exports = router