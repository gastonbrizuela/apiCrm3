exports.getPlaceholderStringForArray = (arr) => {
    if (!Array.isArray(arr)) {
        throw new Error('Invalid input');
    }

    // if is array, we'll clone the arr 
    // and fill the new array with placeholders
    const placeholders = [...arr];
    return placeholders.fill('?').join(', ').trim();
}


exports.multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    columnSet = keys.map(key => `${key} = ?`).join(', ');

    return {
        columnSet,
        values
    }
}

exports.getQueryInsert = ({tableName, values,columns})=>{
    let sql = `INSERT INTO ${tableName} (` + columns.join(" , ") +`) VALUES (;`

    for (let i = 0; i < values.length; i++) {
        sql += "?";
        if (i !== values.length - 1) {
            sql += ",";
        }
    }
    sql+= ")";
    return sql
}

