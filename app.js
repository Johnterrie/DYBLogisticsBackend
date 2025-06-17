import express from 'express'
import Logger from './config/logger.js';
import appConfig from "./config/app.js"


global.logger = Logger.createLogger({
  logDirPath: './logs',
  label: 'DYBLogistics_App',
  debugMode: true
});



const app = express()

appConfig(app)

export default app