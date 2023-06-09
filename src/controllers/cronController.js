// CronController.js
const CronJob = require('cron').CronJob;
const axios = require('axios');
const LogsController = require('../controllers/logsController')
const ScheduleController = require('./scheduleController')
require('dotenv').config()

// Función que se ejecutará en el horario programado
function bellSilence (silence) {
    var bellUrl = 'http://192.168.1.127/?RELE=ON';
    var bellState = 'silencio'
    if (silence) {
        bellUrl = 'http://192.168.1.127/?RELE=OFF'
        bellState = 'ruido'
    }
    axios.get(bellUrl)
        .then(response => {
            if (response.status === 200) {
                LogsController.saveLog('Timbre en modo ' + bellState);
            // Aquí puedes manejar la respuesta exitosa
            } else {
                LogsController.saveLog('No se pudo poner el timbre en modo ' + bellState);
            // Aquí puedes manejar la respuesta no exitosa
            }
        })
        .catch(error => {
            console.log('Ocurrió un error en la solicitud:', error.message);
            // Aquí puedes manejar el error de la solicitud
        });
}

// Configuración de la tarea cron para ejecutarse a las 9:00 AM todos los días
const jobSilence = new CronJob(
    ScheduleController.getScheduleForCron(true),
    function() {
        bellSilence(true);
      },
    null,
    true,
    process.env.TIMEZONE
);
const jobNoise = new CronJob(
    ScheduleController.getScheduleForCron(false),
    function() {
        bellSilence(false);
      },
    null,
    true,
    process.env.TIMEZONE
);
// Iniciar la tarea cron
jobSilence.start();
jobNoise.start();

module.exports = jobSilence;