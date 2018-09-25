const mongoose = require('mongoose');

// Load the schemas
const differenceSchema = require('./models/difference_rows.js');
const targetSchema = require('./models/difference_rows.js');

module.exports = function(mongoDBConnectionString){
    let DiffRows; // defined on connection to the new db instance
    let TargetRows;
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
                    TargetRows = db.model("import_product_ms", targetSchema);                    
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
                    //console.log("diff: " + rows);                     
                    resolve(rows);
                })
                .catch((err)=>{
                    reject(err);
                });
            })
        },
        getDiffDataCount: function()
        {
            return new Promise(function(resolve,reject)
            {
                DiffRows.count({})
                .exec()
                .then((cnt) => {
                    console.log("differ: " + cnt);                        
                    resolve(cnt);
                })
                .catch((err)=>{
                     reject(err);
                });
            })
        },
        getTargetDataCount: function()
        {
            return new Promise(function(resolve,reject)
            {
                TargetRows.count({})
                .exec()
                .then((cnt) => {
                    console.log("target: " + cnt);                          
                    resolve(cnt);
                })
                .catch((err)=>{
                     reject(err);
                });
            })
        }            
    }
}