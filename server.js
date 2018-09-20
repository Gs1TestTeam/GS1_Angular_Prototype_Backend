//const mongoDBConnectionString = "mongodb://teamuser:password123@ds135514.mlab.com:35514/teams-api-db";
// mongodb connection information
const mongoDBConnectionString = "mongodb://gs1:Vkvkdi0*@ds157762.mlab.com:57762/gs1test";
const HTTP_PORT = process.env.PORT || 8081;

const express = require("express");
const bodyParser = require('body-parser');

const cors = require("cors");
const dataService = require("./data-service.js");

const data = dataService(mongoDBConnectionString);
const app = express();

app.use(bodyParser.json());
app.use(cors());

// "Migration Difference" Routes

app.get("/differences", (req,res) => {
    data.getAllDiffRows().then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).end();
    })
});

// Catch-All 404 error

app.use((req, res) => {
    res.status(404).end();
});

// Connect to the DB and start the server

data.connect()
.then(data.getAllDiffRows)
.then((rows)=>{
    console.log(rows)
    app.listen(HTTP_PORT, ()=>{console.log("GS1 Canada Backend System listening on: " + HTTP_PORT)});
})
.catch((err)=>{
    console.log("unable to start the server: " + err);
    process.exit();
});
