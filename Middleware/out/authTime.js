

const authTime = async (req, res , next)=>{
    await res.on('finish', ()=> {
        if(req.token){
            const event = new Date
            console.log(`${req.name} has connected to :`,event.toString());
        }else{
            console.log('User undefined, Access denied')
        }
    })
    next()
}

module.exports = authTime