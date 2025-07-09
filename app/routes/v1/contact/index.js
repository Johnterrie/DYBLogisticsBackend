import { Router } from 'express'
import { ContactController } from '../../../controllers/index.js'

const router = Router()

router.post('/contact', ContactController.submitContact)

export default router