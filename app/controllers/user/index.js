import { User } from '../../models/index.js'
import { Helper, constants, ApiError } from '../../utils/index.js'

const { successResponse, hashPassword, addTokenToData, makeError, moduleErrLogMessager } = Helper

const {
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS
} = constants

/**
 * A collection of methods that controls the success response
 * for CRUD operations on the User.
 *
 * @class UserController
 */
class UserController {
  /**
   * Controllers used for adding users
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the user added
   * @memberof UserController
   */
  static async createUser(req, res, next) {
    try {
   
      const hashedPassword = hashPassword(req.body.password)

      const user = new User({
        ...req.body,
        password: hashedPassword
      })

      const data = await user.save()

      const dataWithToken = addTokenToData(data)

      return successResponse(res, {
        message: CREATE_USER_SUCCESS,
        data: dataWithToken
      })
    } catch (error) {
      // Check for Mongo duplicate key error (e.g. email already exists)
      if (error.code === 11000) {
        return next(new ApiError({
          status: 400,
          message: 'User with this email already exists'
        }))
      }

      const dbError = makeError({ error, status: 500 })

      moduleErrLogMessager(dbError)

      return next(new ApiError({
        status: 500,
        message: CREATE_USER_ERROR
      }))
    }
  }
}

export default UserController
