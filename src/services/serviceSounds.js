'use strict'
const path = require('path');
require('dotenv').config()

var express = require('express'),
    //app = require('../app.js'),
    routes = express.Router()

routes
  .get('/', (req, res) => {
    LogsController.saveLog('GET: ' + path.basename(__filename));
    let data = {
      "health": "OK",
      "current_version": process.env.APP_VERSION
    }
    res.json(data)
  })

module.exports = routes