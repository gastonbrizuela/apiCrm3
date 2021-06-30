const CustomerModel = require('../models/customer.model');
const HttpException = require('../utils/HttpException.utils');
const {validationResult} = require('express-validator')
const dotenv = require('dotenv');
dotenv.config();

class CustomerController {
    getCustomerPag = async(req,res,next)=>{
        let CustomerList = await CustomerModel.find(req);
        if (!CustomerList.length){
            throw new HttpException(404, 'Campaign not found')
        }
        res.send(CustomerList)

    }
    getDetailCustomer = async(req,res,next)=>{
    let [customerDetails, anotherResult] = await Promise.all([CustomerModel.getPersonalDetail(req.params.id), CustomerModel.getConsumerDetail(req.params.id)]);
    if (!customerDetails.length){
        throw new HttpException(404,'Customer not Found')
    }

    res.send([customerDetails,anotherResult])
    }
}

module.exports = new CustomerController