

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