import { Router } from 'express'
import RateController from '../../../controllers/client_rates/index.js'

const router = Router()

router.get('/rates', RateController.getRates)
router.put('/rates/update', RateController.updateRate)
router.post('/rates/add', RateController.createRate)

export default router