import cors from "cors";
import path from "path";
import { json, urlencoded } from "express";
import helmet from "helmet";
import config from "./env/index.js";
import { fileURLToPath } from 'url';
import { Helper, genericErrors, constants } from '../app/utils/index.js'
import favicon from 'serve-favicon'
import morgan from "morgan"
import connectDB from "../app/db/setup/dbconnect.js";


import apiV1Routes from '../app/routes/v1/index.js'




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { notFoundApi } = genericErrors
const { WELCOME, v1 } = constants

const { errorResponse, successResponse } = Helper

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

  app.use("/v1", apiV1Routes)
  // adds a heartbeat route for the culture
  app.get('/', (req, res) => successResponse(res, { message: WELCOME }))

  // app.use((req, res, next) => {
  //   next(notFoundApi)
  // })
  // handles all forwarded errors
  app.use((err, req, res, next) => errorResponse(req, res, err))

  const port = config.PORT || 3000

  //Connection to database
  await connectDB() 

  app.listen(port, () => {
    logger.info(`${'DYBLogistics'} is listening on PORT ${port}`)
  })
}


export default appConfig
