const router = require('express').Router();
const jwt = require('../services/jwt');

router.use(async (req, res, next) => {
    const token = req.body.token || req.headers.authorization;
    if(!token){
        res.status(401).json({'error': 'Authentication token not provided'});
        return;
    }
    
    try {
        const user = jwt.verify(token);
        if(user && user.admin){
            req.user = user;
            next();
        }
        else{
            res.status(403).json({'error': 'You shall not pass'});
        }
    }
    catch(error){
        console.error(error);
        res.status(401).json({'error': 'Invalid token'});
    }
});

module.exports = router;