

const authTime = ((req, res , next)=>{
    const event = new Date
    console.log('AUTH time :',req.body.email, event.toString());
    next()
})

module.exports = authTime