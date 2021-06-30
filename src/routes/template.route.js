const express = require('express');
const router = express.Router();
const templateController = require('../controllers/template.controller')
const auth = require('../middleware/auth.middleware')
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.post('/',awaitHandlerFactory(templateController.createTemplate))
router.get('/',awaitHandlerFactory(templateController.getAllTemplate))

 module.exports = router;