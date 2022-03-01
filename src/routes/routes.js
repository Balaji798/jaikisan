const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControllers');
const cartController = require('../controllers/cartControllers');
const validator = require('../validation/validator');

router.post('/creatUser',validator.checkUser,userController.createUser);
router.get('/getUser',userController.getUser);
router.delete('/deleteUser/:customerID',userController.deleteUser);
router.post('/creatCart',validator.checkCart,cartController.createCart);
router.get('/getCart',cartController.getCart);

module.exports=router;