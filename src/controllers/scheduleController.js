'use strict'

const fs = require("fs");
const LogsController = require('../controllers/logsController')

var ScheduleController = () => { }

ScheduleController.getScheduleForCron = (silence) => {
    let scheduleJson;
    scheduleJson = ScheduleController.getSchedule();
    if (silence) {
        return scheduleJson.silenceSchedule.minute + ' ' + 
            scheduleJson.silenceSchedule.hour + ' ' + 
            scheduleJson.silenceSchedule.day_month + ' ' + 
            scheduleJson.silenceSchedule.month + ' '+ 
            scheduleJson.silenceSchedule.day_week + ' '
    } else {
        return scheduleJson.noiseSchedule.minute + ' ' + 
            scheduleJson.noiseSchedule.hour + ' ' + 
            scheduleJson.noiseSchedule.day_month + ' ' + 
            scheduleJson.noiseSchedule.month + ' '+ 
            scheduleJson.noiseSchedule.day_week + ' '
    }
}

ScheduleController.getSchedule = () => {
    let scheduleJson;
    try {
        if (process.env.NODE_ENV == "prod") {
            scheduleJson = fs.readFileSync(process.env.DATA_DIR_PROD + 'schedule.json', 'utf8');
        } else {
            scheduleJson = fs.readFileSync(process.env.DATA_DIR_DEV + 'schedule.json', 'utf8');
        }
        return JSON.parse(scheduleJson);
    } catch (err) {
        LogsController.saveLog(err);
        return;
    }
}

ScheduleController.updateSchedule = (scheduleUpdated) => {
    let scheduleJson;
    if (process.env.NODE_ENV == "prod") {
        scheduleJson = process.env.DATA_DIR_PROD + 'schedule.json';
    } else {
        scheduleJson = process.env.DATA_DIR_DEV + 'schedule.json';
    }
    try {
        fs.writeFileSync(scheduleJson, JSON.stringify(scheduleUpdated));
        LogsController.saveLog('Schedule modificado correctamente');
        return true;
    } catch (err) {
        console.log('Error al guardar los cambios: ', err);
        LogsController.saveLog('Error al guardar los cambios: ' + err);
        return false;
    }
}

module.exports = ScheduleController