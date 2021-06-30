const SegmentModel = require('../models/segment.model');
const HttpException = require('../utils/HttpException.utils');
const {validationResult} = require('express-validator')
const dotenv = require('dotenv');
dotenv.config();

class SegmentController {
    getAllSegment = async (req, res, next)=>{
        let CampaignList = await SegmentModel.find();
        if (!CampaignList.length){
            throw new HttpException(404, 'Campaign not found')
        }
        res.send(CampaignList)
    };
    createSegment = async (req,res, next)=>{
        this.checkValidation(req);
        
        const result = await SegmentModel.create(req.body)
        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Campaign was created!');
        
    };
    getSegmentById = async (req, res, next) => {
        const campaign = await campaignModel.findOne({ internalId: req.params.id });
        if (!campaign) {
            throw new HttpException(404, 'User not found');
        }

        res.send(campaign);
    };

    deleteUser = async (req, res, next) => {
        const result = await CampaignModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
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

module.exports = new SegmentController