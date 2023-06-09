'use strict'

var express = require('express'),
    routes = express.Router()
const path = require('path');

const ScheduleController = require('../controllers/scheduleController')
const LogsController = require('../controllers/logsController')

routes
    .get('/', (req, res) => {
        LogsController.saveLog('GET: ' + path.basename(__filename));
        let data = ScheduleController.getSchedule();
        res.json(data);
    })

    .put('/', (req, res) => {
        LogsController.saveLog('PUT: ' + path.basename(__filename) + ' Datos: ' + req.body);
        const data = req.body;

        if(ScheduleController.updateSchedule(data)) {
            console.log("entró");
            res.send({ status: 'SUCCESS' });
        }
        res.status(500).send('Error al guardar los cambios')
    });
    

module.exports = routes