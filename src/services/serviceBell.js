'use strict'
const path = require('path');
const PushNotificationController = require('../controllers/pushNotificationController.js')
const LogsController = require('../controllers/logsController')

var express = require('express'),
    routes = express.Router()

routes
    .get('/', (req, res) => {
        LogsController.saveLog('GET: ' + path.basename(__filename));
        PushNotificationController.sendPushNotification('default', 'Prueba push notification', true);
        res.send("Test notification sent");
    })

    .post('/', (req, res) => {
        LogsController.saveLog('POST: ' + path.basename(__filename) + ' Datos: ' + req.body);
        const data = req.body;

        if (data.valor = '1') {
            req.socketIO.emit('foo', 'ring_on');
            console.log('Event: emit "foo"');
            PushNotificationController.sendPushNotification('default', 'Timbre: ¡RING!', false);
            //sleep(2000);
            req.socketIO.emit('foo', 'ring_off');
            console.log('Event: emit "foo"');
        }
        res.send({ status: 'SUCCESS' });
    });

module.exports = routes