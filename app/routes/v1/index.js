import express from 'express'
import auth from './auth/index.js'


const router = express.Router({ mergeParams: true })

router.use('/', auth)


export default router


console.log("working");
