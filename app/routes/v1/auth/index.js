import { Router } from 'express'
import { UserController, AuthController } from '../../../controllers/index.js'


const { createUser } = UserController
const { signIn } = AuthController

const router = Router()

router.post(
  '/signup',  
  createUser
)

router.post(
  '/signin',
  signIn
)



export default router
