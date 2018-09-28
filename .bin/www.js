#!/usr/bin/env node

"use strict";
require('dotenv').config()
//module dependencies.
var app = require("../app/server").default;
var debug = require("debug")("express:server");
var http = require("http");
//get port from environment and store in Express.
var port = process.env.PORT || 5000;
app.start(port);
// app.app.set("port", port);

// //create http server
// var server = http.createServer(app);

// //listen on provided ports
// server.listen(port);

// //add error handler
// server.on("error", () => console.log("err"));

// //start listening on port
// server.on("listening", () => {
//     console.log("server is running on ", port);

// });

// app.listen(port, () => {
// })