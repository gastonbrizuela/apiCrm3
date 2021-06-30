const query = require('../db/db-connection');
const {multipleColumnSet, getQueryInsert} = require('../utils/common.utils')
const Role = require('../utils/userRoles.utils');


class TemplateModel{
    tableName = 'CrmTemplate'
    find = async(params={})=>{
        let sql = `SELECT * from ${this.tableName}`
        
        if (!Object.keys(params).length){
            return await query(sql)
        }

        const {columnSet, values} = multipleColumnSet(params)
        sql += `where ${columnSet}`
        return await query(slq, [...values])
    }
    create = async (params)=>{
        console.log('llega antes')
        const {sql, values} = getQueryInsert({"tableName":this.tableName, "object":params})
        console.log('llega despues')
        const result  = await query(sql, values)
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows
    }
}

module.exports = new TemplateModel