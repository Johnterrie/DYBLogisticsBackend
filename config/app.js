console.log("working");

import cors from "cors";
import path from "path";
import { json, urlencoded } from "express";
import helmet from "helmet";
import favicon from 'serve-favicon'
import { fileURLToPath } from 'url';
import config from "./env/index.js";

import morgan from "morgan"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appConfig = async (app) => {
  // integrate winston logger with morgan
  app.use(morgan('combined', { stream: logger.stream }))
  // adds security middleware to handle potential attacks from HTTP requests
  app.use(helmet())
  // adds middleware for cross-origin resource sharing configuration
  app.use(cors())
  // adds middleware that parses requests whose content-type is application/json
  app.use(json())
  // adds middleware that parses requests with x-www-form-urlencoded data encoding
  app.use(urlencoded({ extended: true }))
  // serves favicon
  app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))
  // adds a heartbeat route for the culture


  const port = config.PORT || 3000


  app.listen(port, () => {
    logger.info(`${'DYBLogistics'} is listening on PORT ${port}`)
  })
}


export default appConfig
