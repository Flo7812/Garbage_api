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

const jwtAuthGuard = (req, res,next)=>{
    try {
        const token = req.headers.authorization && extractBearer(req.headers.authorization)
        // console.log('token: ',token); // token
        if(!token){
            return res.status(401).json({messages: 'missing token or what?'})
        }
        req.token = jwt.verify(token, process.env.JWT_SECRET_SENTENCE, (err, decodedToken)=>{
            if(err){
                return res.status(401).json({message: 'bad token'})
            }
            //console.log(decodedToken);       // body
            // console.log(decodedToken.role); // 1 or 2
            return decodedToken
        })
        // console.log('juste avant le next');
        next()
    } catch (error) {
        console.log('ici:',error);
    }
}

module.exports = jwtAuthGuard