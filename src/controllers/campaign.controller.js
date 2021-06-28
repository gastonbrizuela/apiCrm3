const CampaignModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const {validationResult} = require('express-validator')
const dotenv = require('dotenv')
dotenv.config();

class CampaignController {
    getAllCampaign = async (req, res, next)=>{
        let CampaignList = await CampaignModel.find();
        if (!CampaignList.length){
            throw new HttpException(404, 'Campaign not found')
        }
        res.send(CampaignList)
    }
}

module.exports = new CampaignController