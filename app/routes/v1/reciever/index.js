import { Router } from 'express'
import { RecieverController } from '../../../controllers/index.js'

const router = Router()

router.get('/addreciever', RecieverController.saveReceiverDetails)

export default router