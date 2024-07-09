const fs = require('fs')

function readDb(dbName = 'db.json') {
    // read JSON object from file
    const todos = fs.readFileSync(dbName, 'utf8')
    return JSON.parse(todos)
}

function writeDb(obj, dbName = 'db.json') {
    if (!obj) return console.log('Please provide data to save')
    try {
        fs.writeFileSync(dbName, JSON.stringify(obj)) //overwrites current data
        return console.log('SAVE SUCCESS')
    } catch (err) {
        return console.log('FAILED TO WRITE')
    }
}



module.exports = { readDb, writeDb }