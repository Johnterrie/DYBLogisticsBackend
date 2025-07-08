import { Router } from 'express'
import contactController from '../../../controllers/contact/index.js'

const router = Router()

router.post('/contact', contactController.submitContact)

export default router