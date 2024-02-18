<<<<<<< HEAD
const GVPAsequelize = require("../../DB/Connection/GVP");
const GVPEsequelize = require("../../unUsed/GVPEsequelize");


exports.logout = async(req, res)=>{
    console.log(req.token);
    try {
        if(req.baseUrl === '/admin'){
            console.log(req.baseUrl);
            // destruction token
            await GVPAsequelize.close()
            .then(()=>{
                console.log(`${req.token.first_name} ${req.token.last_name} disconneted`)
                return res.redirect(200,'/')
            })
            .catch((e)=>console.log('error logout admin :', e))
        }else{
            if(req.baseUrl === '/user'){
                console.log(req.baseUrl);
            // destruction token
            GVPEsequelize.close()
            .then(()=>{
                console.log(`${req.token.first_name} ${req.token.last_name} disconneted`)
                res.redirect(200,'/')
            })
            .catch((e)=>console.log('error logout employee :', e))
        }else{
            return res.status(456).json({Logout :`Who are you?`})
        }
    }} catch (error) {
        console.log(error);
        return res.redirect(401,'/')
    }
}

=======


async function logout(){
    try {
        if(req.baseUrl === '/admin'){

            // destruction token
        }
        if(req.baseUrl === '/user'){

            // destruction token
        }else{
            return res.status(456).json({Logout :`Who are you?`})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({Logout: `Error DATABASE, unable to disconnect`})
    }
}

module.exports = logout
>>>>>>> origin/ModelControllers
