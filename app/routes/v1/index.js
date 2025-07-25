import express from 'express'

import auth from './auth/index.js'
import rate from "./shipping/index.js"
import supportCenter from "./support_center/index.js"



const router = express.Router({ mergeParams: true })

router.use('/', auth)
router.use('/', rate)
router.use('/', supportCenter)

export default router
