// Connect to the DB and start the server
const sql = require('mssql')

var dbConfig = {
    server: "localhost\\SQLEXPRESS",
    database: "jongkuktest",
    user: "jongkuklee",
    password: "Vkvkdi0&",
    port: "1433",
    options: {
        encrypt: false
    }
}

// var dbConfig = {
//     server: "LDM-OLGAA\\SQLEXPRESS",
//     database: "cert_sept",
//     user: "jlee",
//     password: "password789!",
//     port: "1433",
//     options: {
//         encrypt: false
//     }
// }

// Load the schemas
module.exports = function(){
     var conn;
     return {
        getSourceDataCount: function()
        {
            return new Promise(function(resolve,reject) {            
                var conn = new sql.ConnectionPool(dbConfig);

                conn.connect().then(function() {
                    var req = new sql.Request(conn);

                    req.query("select count(0) as source_count from import_product i, import_product_version v where i.pid = v.pid").then( function(row) {
                    //req.query("SELECT count(0) as source_count FROM import_product i FULL OUTER JOIN import_product_version v ON i.pid=v.pid").then( function(row) {
                        console.log("source: " + row.recordset[0].source_count);    
                        resolve(row.recordset[0].source_count);
                        conn.close();
                    })
                    .catch(function(err) {
                        console.log(err);
                        reject(err);
                        conn.close();
                    });
                })
                .catch(function(err){
                    console.log(err);
                    reject(err);
                });
            });
        }
    }
}
