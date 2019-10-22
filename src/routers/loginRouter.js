const router = require('express').Router();
const encrypt = require('../services/encrypt');
const jwt = require('../services/jwt');

const User = require('../models/user');

router.all('/login', async (req, res, next) => {

    const userBody = req.body;
    if(userBody.username){
        const foundUser = await User.findOne({'username': userBody.username});
        if(foundUser){
            if(await encrypt.compare(userBody.password, foundUser.password)){
                const token = jwt.getToken({username: foundUser.username, admin: foundUser.admin});
                res.setHeader('Authorization', token);
                foundUser.password = undefined;
                res.json({user: foundUser, token});
            }
            else {
                res.json({'error': 'Password incorrect'});
            }
        }
        else{
            res.json({'error': 'User not found'});
        }
    }
    else{
        res.json({'error': 'Missing username'});
    }
    next();
});

module.exports = router;