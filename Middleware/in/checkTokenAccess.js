const jwt = require('jsonwebtoken')

const extractBearer = (authorization) =>{
    if(typeof authorization !== 'string'){
        return false
    }
    const matches = authorization.match(/(Bearer)\s+(\S+)/i)
    // console.log(authorization);                                  // BearerToken
    // console.log(authorization[0]);                               // B
    // console.log(authorization[6]);                               // ''
    // console.log(authorization[7]);                               // e
    // console.log('matches : ', matches)                           // [BearerToken, Bearer, Token, index = 0, input = BearerToken, groups? = 0]
    // console.log(matches[0])                                      // BearerToken
    // console.log(matches[1])                                      // Bearer
    // console.log(matches[2])                                      // token
    // console.log(matches[3])                                      // undefined
    // console.log(matches.input)                                   // BearerToken
    // console.log(matches[4])                                      // undefined
    // console.log('matches && matches[2] :',matches && matches[2]) // token
    return  matches  &&  matches[2] 
}

const checkTokenAccess = (req, res,next)=>{
    try {
        const token = req.headers.authorization && extractBearer(req.headers.authorization)
        if(!token){
            return res.status(401).json({messages: 'Access denied for missing token'})
        }
        req.token = jwt.verify(token, process.env.JWT_SECRET_SENTENCE, (err, decodedToken) =>{
            if(err){
                return res.status(401).json({message: 'Access denied for bad token'})
            }
            // res.status(200).json({message:'Authorized access from Token control'})
            req.username = decodedToken.username
            req.id = decodedToken.id
            req.role = decodedToken.role
            return decodedToken
        })
        next()
    } catch (error) {
        res.status(500).json({message: 'Error from token control', error: error})
    }
}

module.exports = checkTokenAccess