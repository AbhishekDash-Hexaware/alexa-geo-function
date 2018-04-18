var winston = require('winston');
require('winston-daily-rotate-file');
// var initiator = require('../app')

"use strict"

var loggerConfig={
    
    "loggerob": new (winston.Logger)({
                    transports: [
                      // colorize the output to the console
                      new winston.transports.Console({
                        name : 'Monitoring',
                        level: process.env.environment === 'monitoring' ? 'silly' : 'OFF',
                        prettyPrint :true,
                        timestamp: true,
                        colorize: true,
                        timestamp: true,
                      }),
                      new winston.transports.Console({
                        name : 'Development',
                        level: process.env.environment === 'dev' ? 'debug' : 'OFF',
                        prettyPrint :true,
                        timestamp: true,
                        colorize: true,
                        timestamp: true,
                      }),
                  
                      new winston.transports.DailyRotateFile({
                        name :'Production',
                        level: process.env.environment === 'prod' ? 'info' :'OFF',
                        filename: `logs/-prodlog.log`,
                        prettyPrint: true,
                        timestamp: true,
                        maxsize: 20000,
                        prepend:true,
                        json:false,
                        zippedArchive: true,
                        maxFiles: 10
                      }),
                  
                      new winston.transports.DailyRotateFile({
                        name :'UAT/QA',
                        level: process.env.environment === 'uat/qa' ? 'info' :'OFF',
                        filename:`logs/-staginglog.log`,
                        prettyPrint: true,
                        timestamp: true,
                        maxsize: 20000,
                        prepend:true,
                        json:false,
                        zippedArchive: true,
                        maxFiles: 10
                      })
                    ]
                  })

}


module.exports= loggerConfig;

