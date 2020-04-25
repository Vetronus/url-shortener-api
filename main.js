'use strict'
const express = require("express");
var cors = require('cors');
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const handler = require("./middleware/Handler");
app.use(cors());
app.options('*', cors());


// setting up db connection
mongoose.Promise = Promise;
mongoose.set('useFindAndModify', false);
global.URI = "mongodb://localhost:27017/sandbox";
mongoose.connect(global.URI, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", function(err){ console.error("DB Connection Error: ", err);});
db.once("open", function(){ console.log("DB Connected.");});


// 3rd Party Middlewares
app.use(express.json()); //Decodes Form Data
app.use(morgan('tiny')); //Logs requests


// API Route
const link = require("./routes/link");
app.use("/api/link", link);


// middleware to handle err and res.
app.use(handler.handleRes);
app.use(handler.handleError);


// Starting Server
const port = process.env.PORT || 3000;
app.listen(port, function(){console.log("URL Shortener API | ", port);});