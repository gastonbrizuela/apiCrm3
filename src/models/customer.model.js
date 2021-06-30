const query = require('../db/db-connection');
const {multipleColumnSet, getQueryInsert} = require('../utils/common.utils')

class CustomerModel {
    tableName = 'Customer';

    find = async(req)=>{
        const limit = parseInt(req.query.limit, 10)
        const page = parseInt(req.query.page, 10)
        const offset = (page-1)*limit
        var sql = "select Code, NameOne, LastNameTwo,Sex,ChargeDate,Email from Customer where LastNameTwo is not Null limit " +limit+ " OFFSET "+ offset
        return await query(sql)
    }

    getPersonalDetail = async(id)=>{
        var sql =   `select Name,Code,Email,Phone,Mobile,NameOne,LastNameTwo,Birthdate,Sex from Customer where Code = '${id}';`
       return await query(sql)
    }

    getConsumerDetail =  async(id)=>{
        let sql = `select avg(Total) as avgtotal, sum(Total) sumtotal,count(Total) counttotal, SUM(If(Year(TransDate)>=YEAR(CURDATE()),1,0)) counttotalyear,SUM(If(Year(TransDate)>=YEAR(CURDATE()),Total,0)) sumtotalyear,
        max(TransDate) as maxtransdate
        from Invoice where CustCode = '${id}'
       and Year(TransDate)> 2017 `
       return await query(sql)
    }

}

module.exports = new CustomerModel