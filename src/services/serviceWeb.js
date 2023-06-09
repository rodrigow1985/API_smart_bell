'use strict'

var express = require('express'),
    routes = express.Router()

const WebController = require('../controllers/webController.js')

routes
    .get('/', async (req, res) => {
        const data = await WebController.getHtml();
        if (data) {
            console.log(data);
            res.json(data);
        } else {
            res.json({ html: 'ERROR - VER SERVIDOR' });
        }
    })

module.exports = routes