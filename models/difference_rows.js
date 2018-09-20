var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the employeeSchema
var differenceRowsSchema = new Schema({
    pid : String,
    gtin : String,
    gln : String,
    targetMarketCountryCode : String,
    isDeleted : Number,
    last_modified_date : Date,
    pid_dw : String,
    gtin_dw : String,
    gln_dw : String,
    targetMarketCountryCode : String
});

module.exports = differenceRowsSchema;