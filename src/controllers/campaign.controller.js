const CampaignModel = require('../models/campaign.model');
const HttpException = require('../utils/HttpException.utils');
const {validationResult} = require('express-validator')
const dotenv = require('dotenv');
const campaignModel = require('../models/campaign.model');
dotenv.config();

class CampaignController {
    getAllCampaign = async (req, res, next)=>{
        let CampaignList = await CampaignModel.find();
        if (!CampaignList.length){
            throw new HttpException(404, 'Campaign not found')
        }
        res.send(CampaignList)
    };
    createCampaign = async (req,res, next)=>{
        this.checkValidation(req);
        
        const result = await campaignModel.create(req.body)
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Campaign was created!');
        
    };
    getCampaignById = async (req, res, next) => {
        const campaign = await campaignModel.findOne({ internalId: req.params.id });
        if (!campaign) {
            throw new HttpException(404, 'User not found');
        }

        res.send(campaign);
    };

    deleteCampaign = async (req, res, next) => {
        const result = await CampaignModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Campaign not found');
        }
        res.send('User has been deleted');
    };
    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}

module.exports = new CampaignController