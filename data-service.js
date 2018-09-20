const mongoose = require('mongoose');

// Load the schemas
const differenceSchema = require('./models/difference_rows.js');

module.exports = function(mongoDBConnectionString){
    let DiffRows; // defined on connection to the new db instance

    return {
        
        connect: function()
        {
            return new Promise(function(resolve,reject)
            {
                let db = mongoose.connect(mongoDBConnectionString, { useMongoClient: true });
                
                db.on('error', (err)=>{
                    reject(err);
                });
        
                db.once('open', ()=>{
                    DiffRows = db.model("tests", differenceSchema);
                    resolve();
                });
            });
        },
        getAllDiffRows: function(){
            return new Promise(function(resolve,reject)
            {
                DiffRows.find()
                .exec()
                .then((rows) => {
                    console.log(rows);                     
                    resolve(rows);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        }         
    }
}