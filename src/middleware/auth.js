//const requestMethodsUnavailable = ['DELETE', 'PATCH', 'POST']
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const auth = async (req, res, next) => {
    //console.log('auth middleware')
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e){
        //console.log(e)
        res.status(401).send({ error: 'Please authenticate.'})
    }
    
    
    /*
    if(requestMethodsUnavailable.includes(req.method)){
        res.status(503).send('Updating methods are currently unavailable.')
    } else {
        next()
    }
    */
}

module.exports = auth