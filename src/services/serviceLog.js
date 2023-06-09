'use strict'

var express = require('express'),
    routes = express.Router()
const path = require('path');
const LogsController = require('../controllers/logsController')

routes
    .get('/', (req, res) => {
        LogsController.saveLog('GET: ' + path.basename(__filename));
        res.send("Logs ok");
    })

    .post('/', (req, res) => {
        LogsController.saveLog('POST: ' + path.basename(__filename) + 'Datos: ' + req.body);
        const data = req.body;

        LogsController.saveLog(data.valor);

        res.send({ status: 'SUCCESS' });
    });

module.exports = routes