import { Router } from 'express'
import CalculatorController from '../../../controllers/calculator/index.js'

const router = Router()

router.post('/calculator', CalculatorController.saveRateCalculation)

export default router