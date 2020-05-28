const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const exhdbrs = require("express-handlebars");
const _handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');


let PORT = process.env.PORT || 3000;
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/Scraping-The-News';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// initialize express
const app = express();

// use morgan logger for logging requests
app.use(logger("dev"));
// use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// set static directory
app.use(express.static("public"));
// Set Handlebars as the default templating engine
app.engine("handlebars", exhdbrs({ handlebars: allowInsecurePrototypeAccess(_handlebars) }));
app.set("view engine", "handlebars");



// check connection status
let db = mongoose.connection;
db.on('error', (error) => {
    console.log(`Connection error ${error}`);
});

require('./routes/routes.js')(app);

// start server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});