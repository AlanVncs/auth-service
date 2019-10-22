const User = require('../models/user');
const jwt = require('../services/jwt');

module.exports = {

    getUser: async (req, res) => {
        var foundUsers = null;
        if(req.body.username){
            foundUsers = await User.findOne({'username': req.body.username});
            foundUsers = foundUsers?[foundUsers]:null;
            if(!foundUsers){
                res.status(404).json({'error': 'User not found', 'user': req.body});
                return;
            }
        }
        else {
            foundUsers = await User.find();
        }
        res.json(foundUsers);
    },

    saveUser: async (req, res) => {
        const userBody = req.body;
        const user = new User(userBody);
        try {
            const response = await user.save();
            userBody.password = undefined;
            const token = jwt.getToken({username: response.username, admin: response.admin});
            res.setHeader('Authorization', token);
            res.json({user: userBody, token});
        }
        catch(error){
            res.json(error);
        }
    },

    updateUser: async (req, res) => {
        if(req.body.username){
            const queryResult = await User.updateOne({'username': req.body.currentUsername}, req.body);
            res.json(queryResult);
        }
        else{
            res.json({'error': "Missing 'username'"});
        }
    },

    deleteUser: async (req, res) => {
        if(req.body.username){
            const queryResult = await User.deleteOne({'username': req.body.username});
            res.json(queryResult);
        }
        else{
            res.json({'error': "Missing 'username'"});
        }
    }
}