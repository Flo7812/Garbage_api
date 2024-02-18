

const loginTime = (req, res, next) =>{

    res.on('finish', async()=> {
            const event = new Date
            console.log(`${req.body.name} has connected to :`,event.toString());
    })
    next()  
}
module.exports = loginTime