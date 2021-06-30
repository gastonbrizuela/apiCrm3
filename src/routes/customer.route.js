const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer.controller');
const auth = require('../middleware/auth.middleware')
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/',awaitHandlerFactory(CustomerController.getCustomerPag))
//router.post('/',awaitHandlerFactory(CustomerController.createCampaign))
router.get('/:id',awaitHandlerFactory(CustomerController.getDetailCustomer))
//router.delete('/:id',awaitHandlerFactory(CustomerController.deleteUser))

 module.exports = router;