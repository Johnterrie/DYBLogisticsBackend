import express from 'express'

import auth from './auth/index.js'
import rate from "./shipping/index.js"
import supportCenter from "./support_center/index.js"
import dashboard from "./dashboard/index.js"
import shipping from "./shipping/index.js"

const router = express.Router({ mergeParams: true })

router.use('/', auth)
router.use('/', rate)
router.use('/', supportCenter)
router.use('/', dashboard)
router.use('/', shipping)


export default router
