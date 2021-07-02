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
    console.log(customerDetails)
    const result = this.generateResponseDetail(customerDetails,anotherResult)
    res.send(result)
    }
    generateResponseDetail = (resultPersonal, resultConsume)=>{
        const secondQuery = resultConsume[0]
        const listResultCard = []
        const firstCardInfo = {avgTotal:['Ticket promedio',secondQuery['avgtotal']],maxTransDate:['ultima compra',secondQuery['maxtransdate']]}
        const secondCardInfo = {sumTotal:['renueve total',secondQuery['sumtotal']],countTotal:['Cantidad de tickets',secondQuery['counttotal']]}
        const thirdCardInfo = {counttotalYear:['Cantidad Ticket(ultimo año)',secondQuery['counttotalyear']],sumTotalYear:['Revenue (Ultimo año)',secondQuery['sumtotalyear']]}
        listResultCard.push(firstCardInfo,secondCardInfo,thirdCardInfo)
        const FinalResult = {   dataCustomer:resultPersonal[0],
                                dataCards:listResultCard}
        return FinalResult
    }
}

module.exports = new CustomerController