const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Expo } = require('expo-server-sdk')
ServiceIndex = require('./services/serviceIndex.js')
ServiceBell = require('./services/serviceBell.js')
ServiceSound = require('./services/serviceSounds.js')
ServiceLog = require('./services/serviceLog.js')
ServiceWeb = require('./services/serviceWeb.js')
ServiceSchedule = require('./services/serviceSchedule.js')
const CronController = require('./controllers/cronController.js')
const LogsController = require('./controllers/logsController')

//const { Server } = require("socket.io");
require('dotenv').config()
/*const socketIO = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});*/
const socketIO = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
//const socketIO = new Server(server);

const cors = require('cors');
const bp = require('body-parser')

// Settings
var allowedOrigins = [
  'http://localhost:4001',
  'http://192.168.1.129',
  'http://localhost:8080'
];

app.use(function(req, res, next) {
  req.socketIO = socketIO;
  next();
});

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('disconnect', () => {
      socket.disconnect()
      console.log('🔥: A user disconnected');
    });
});

// Middlewares
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors({
    origin: '*'
}));

//// SERVICES
app.use('/', ServiceIndex)
app.use('/' + process.env.APP_VERSION + '/bell', ServiceBell)
app.use('/' + process.env.APP_VERSION + '/sounds', ServiceSound)
app.use('/' + process.env.APP_VERSION + '/log', ServiceLog)
app.use('/' + process.env.APP_VERSION + '/schedule', ServiceSchedule)
app.use('/' + process.env.APP_VERSION + '/web', ServiceWeb)

server.listen(process.env.NODE_ENV == 'prod' ? process.env.NODE_PORT_PROD : process.env.NODE_PORT_DEV, () => {
  LogsController.saveLog('Server started. Listening on *:' + (process.env.NODE_ENV == 'prod' ? process.env.NODE_PORT_PROD : process.env.NODE_PORT_DEV));
    //console.log('listening on *:' + process.env.NODE_ENV == 'prod' ? process.env.NODE_PORT_PROD : process.env.NODE_PORT_DEV);
});

// Manejo de errores
process.on('unhandledRejection', (err) => {
  LogsController.saveLog('Server stoped:', err);
  // Detener la tarea cron si se produce un error no controlado
  CronController.stop();
});

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
