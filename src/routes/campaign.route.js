const express = require('express');
const router = express.Router();
const campaignCotroller = require('../controllers/campaign.controller');
const auth = require('../middleware/auth.middleware')
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/',awaitHandlerFactory(campaignCotroller.getAllCampaign))
router.post('/',awaitHandlerFactory(campaignCotroller.createCampaign))
router.get('/:id',awaitHandlerFactory(campaignCotroller.getCampaignById))
router.delete('/:id',awaitHandlerFactory(campaignCotroller.deleteUser))

 module.exports = router;