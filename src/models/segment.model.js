const query = require('../db/db-connection');
const {multipleColumnSet, getQueryInsert} = require('../utils/common.utils')
const Role = require('../utils/userRoles.utils');

class SegmentModel{
    tableName = 'CrmCampaignSegment';

    find = async (params = {}) =>{
        let sql = `SELECT * from ${this.tableName}`
        
        if (!Object.keys(params).length){
            return await query(sql)
        }

        const {columnSet, values} = multipleColumnSet(params)
        sql += `where ${columnSet}`
        return await query(slq, [...values])
    }
    create = async (params) =>{
        const {sql,values} = getQueryInsert({"tableName":this.tableName, "object":params})
        const result  = await query(sql, values)
        const affectedRows = result ? result.affectedRows : 0;
        return affectedRows
    }

    findOne = async (params)=>{
        const {columnSet, values} = multipleColumnSet(params)

        const sql = `Select * from ${this.tableName}
                    Where ${columnSet}`
        
        const result = await query (sql, [...values]);
        
        return result[0];
    }
    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE internalId = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new SegmentModel