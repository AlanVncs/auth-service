const router = require('express').Router();
const crudController = require('../controllers/crudController');

router.use(require('body-parser').json());

const defaultRoute = /^\/crud$/;

router.all(defaultRoute, async (req, res, next) => {
    
    switch(req.method){
        case 'GET':
            await crudController.getUser(req, res);
            break;

        case 'POST':
            await crudController.saveUser(req, res);
            break;

        case 'PUT':
            await crudController.updateUser(req, res);
            break;

        case 'DELETE':
            await crudController.deleteUser(req, res);
            break;
    }
    next();
});

module.exports = router;