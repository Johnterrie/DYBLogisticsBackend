import express from 'express'

import auth from './auth/index.js'
import rate from "./shipping/index.js"
import contact from "./contact/index.js"
import calculator from "./calculator/index.js"


const router = express.Router({ mergeParams: true })

router.use('/', auth)
router.use('/', rate)
router.use('/', contact)
router.use('/', calculator)


export default router
