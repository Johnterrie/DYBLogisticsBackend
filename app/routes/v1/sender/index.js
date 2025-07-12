import { Router } from 'express'
import { SenderController } from '../../../controllers/index.js'

const router = Router()

router.get('/addsender', SenderController.saveSenderDetails)

export default router