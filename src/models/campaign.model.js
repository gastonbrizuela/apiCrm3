const query = require('../db/db-connection');
const {multipleColumngSet, getQueryInsert} = require('../utils/common.utils')
const Role = require('../utils/userRoles.utils');

class CampaignModel{
    tableName = 'CrmCampaign';

    find = async (params = {}) =>{
        let sql = `SELECT * from ${this.tableName}`
        
        if (!Object.keys(params).length){
            return await query(sql)
        }

        const {columnSet, values} = multipleColumngSet(params)
        sql += `where ${columnSet}`
        return await query(slq, [...values])
    }

    findOne = async (params)=>{
        const {columnSet, values} = multipleColumngSet(params)

        const sql = `Select * from ${this.tableName}
                    Where ${columnSet}`
        
        const result = await query (sql, [...values]);
        
        return result[0];
    }

    create = async (params) =>{
        const {columnSet, values} = multipleColumngSet(params)
        const sql = getQueryInsert(this.tableName, columnSet, values)
        const result  = await query(sql, values)
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows
    }

    
}

module.exports = new CampaignModel;