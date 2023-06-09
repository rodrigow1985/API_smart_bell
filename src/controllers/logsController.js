'use strict'
var log4js = require("log4js");
var logger = log4js.getLogger('things');
logger.level = "debug";
require('dotenv').config()

const options = {
    timeZone: process.env.TIMEZONE,
    folderPath: './logs/',      
    dateBasedFileNaming: true,
    // Required only if dateBasedFileNaming is set to false
    fileName: 'All_Logs',   
    // Required only if dateBasedFileNaming is set to true
    fileNamePrefix: 'Logs_',
    fileNameSuffix: '',
    fileNameExtension: '.log', 
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm:ss.SSS',
    logLevel: 'debug',
    onlyFileLogging: true
  }
  
  log4js.configure({
    appenders: {
      file: {
        type: 'file',
        filename: './logs/important-things.log',
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        backups: 5, // keep five backup files
        compress: true, // compress the backups
        encoding: 'utf-8',
        mode: 0o0640,
        flags: 'w+',
        pattern: '.mm',
      },
      dateFile: {
        type: 'dateFile',
        filename: './logs/more-important-things.log',
        pattern: 'yyyy-MM-dd-hh',
        compress: true,
      },
      out: {
        type: 'stdout',
      },
    },
    categories: {
      default: { appenders: ['file', 'dateFile', 'out'], level: 'trace' },
    },
  });

var LogsController = () => {
}

LogsController.saveLog = (textToLog) => {
    try {
        //console.log("log");
        logger.trace(textToLog)
    } catch (err) {
        console.log(err);
        return;
    }
}

module.exports = LogsController