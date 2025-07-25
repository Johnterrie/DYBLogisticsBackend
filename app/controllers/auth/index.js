import { User } from '../../models/index.js'
import { Helper } from '../../utils/helpers/index.js'
import constants from '../../utils/constants/index.js'

const { INVALID_EMAIL, LOGIN_USER_SUCCESSFULLY, EMPTY_EMAIL, FORBIDDEN } = constants

/**
 * AuthController class handles user authentication
 */
class AuthController {
  /**
   * Logs in a user
   * @param {Request} req - Express Request object
   * @param {Response} res - Express Response object
   * @returns {JSON} - success or error response
   */
   static async signIn(req, res) {
    try {
      const { email, password } = req.body

      // Check for missing fields
      if (!email || !password) {
        return Helper.errorResponse(req, res, {
          status: 400,
          message: EMPTY_EMAIL,
        })
      }
      // Find user by email
      const user = await User.findOne({ email })
      if (!user) {
          return Helper.errorResponse(req, res, {
              status: 401,
              message: FORBIDDEN,
            })
        }

        // Compare password
        const isMatch = Helper.compareHash(password, user.password)

        if (!isMatch) {
            return Helper.errorResponse(req, res, {
                status: 401,
                message: INVALID_EMAIL,
            })
        }
        
        // Attach token to user
        const userData = Helper.addTokenToData(user)
        

      // Send success response
      return Helper.successResponse(res, {
        message: LOGIN_USER_SUCCESSFULLY,
        data: userData,
      })
    } catch (error) {
      return Helper.errorResponse(req, res, Helper.makeError({ error, status: 500 }))
    }
  }


  /**
   * Logs out the user by clearing the auth token cookie
   * @static
   * @param {Request} req
   * @param {Response} res
   * 
   */
  static async logout(req, res) {
    try {
      // Clear the token cookie
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      })

      return Helper.successResponse(res, {
        message: 'Successfully logged out',
      })
    } catch (error) {
      return Helper.errorResponse(req, res, {
        message: 'Logout failed',
        status: 500,
        errors: error.message
      })
    }
  }
}

export default AuthController
