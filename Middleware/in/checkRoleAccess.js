

const CheckRoleAccess = (req, res, next)=>{
    try {
        if(req.role === 1){
            // res.status(200).json({message: 'Authorized access for admin '})
            next()
        }else{
            return res.status(401).json({message: 'Unauthorized access, role admin needed'})
        }
    } catch (error) {
        res.status(500).json({message: 'Check Role Access Error', error: error})
    }
    
}

module.exports = CheckRoleAccess