const express = require("express");
const expresshdbrs = require("express-handlebars");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const axios = require("axios");

let Article = require("./models/Article");
let Comment = require("./models/Comment");

let db = mongoose.connection;

let PORT = process.env.PORT || 3000;

// Initialize Express
let app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(bodyParser.urlencoded({ extended: false }));
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/Scraping-The-News", { useNewUrlParser: true });


app.engine("handlebars", expresshdbrs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "/views/layouts/partials")
}));
app.set("view engine", "handlebars");

db.on("error", function (error) {
    console.log("Mongoose Error: ", error);
});

db.once("open", function () {
    console.log("Mongoose connection successful.");
});

app.listen(PORT, function () {
    console.log("App running on PORT: " + PORT);
})