import express from 'express'

import auth from './auth/index.js'
import rate from "./shipping/index.js"
import contact from "./contact/index.js"
import calculator from "./calculator/index.js"
import sender from "./sender/index.js"
import reciever from "./reciever/index.js"


const router = express.Router({ mergeParams: true })

router.use('/', auth)
router.use('/', rate)
router.use('/', contact)
router.use('/', calculator)
router.use('/', sender)
router.use('/', reciever)


export default router
