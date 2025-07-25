import { Router } from 'express'
import { UserController, AuthController } from '../../../controllers/index.js'


const { createUser } = UserController
const { signIn, logout } = AuthController

const router = Router()

router.post(
  '/signup',  
  createUser
)

router.post(
  '/signin',
  signIn
)

router.post(
  "/logout", logout
)



export default router
