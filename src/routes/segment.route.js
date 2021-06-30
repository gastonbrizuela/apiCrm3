const express = require('express');
const router = express.Router();
const segmentCotroller = require('../controllers/segment.contoller')
const auth = require('../middleware/auth.middleware')
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');


router.get('/',awaitHandlerFactory(segmentCotroller.getAllSegment))
router.post('/',awaitHandlerFactory(segmentCotroller.createSegment))
router.get('/:id',awaitHandlerFactory(segmentCotroller.getSegmentById))
//router.delete('/:id',awaitHandlerFactory(segmentCotroller.deleteSegment))

 module.exports = router;