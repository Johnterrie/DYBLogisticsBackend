import express from 'express'
import auth from './auth/index.js'
import rate from "./shipping/index.js"


const router = express.Router({ mergeParams: true })

router.use('/', auth)
router.use('/', rate)


export default router
