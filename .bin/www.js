#!/usr/bin/env node

"use strict";
//module dependencies.

var app = require("../app/server").default;
var debug = require("debug")("express:server");
var http = require("http");
//get port from environment and store in Express.
var port = process.env.PORT || 5000;
app.start(port);