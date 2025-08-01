import { v4 as uuidV4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../config/index.js";
import genericError from "../error/generic.js";
import DBError from "../error/db.error.js";
import constants from "../constants/index.js";
import { User } from "../../models/index.js";

const { FAIL, SUCCESS, SUCCESS_RESPONSE, AUTH_ERROR } = constants;
const { serverError } = genericError;
const { SECRET } = config;

/**
 * Contains Helper methods
 * @class Helper
 */
class Helper {
  /**
   * It generates a uniqueId.
   * @static
   * @memberof Helper
   * @returns {String} - A unique string.
   */
  static generateId() {
    return uuidV4();
  }

  /**
   * It parses a data
   * @static
   * @param {string} data - The data to be parsed
   * @memberof Helper
   * @returns {any} - The parsed data.
   */
  static parseData(data) {
    return JSON.parse(data);
  }

  /**
   * This is used for generating a hash and a salt from a user's password.
   * @static
   * @param {string} password - password to be encrypted.
   * @memberof Helper
   * @returns {string} - An string containing the hash and salt of a password.
   */
  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  /**
   * This checks if a plain text matches a certain hash value by generating
   * a new hash with the salt used to create that hash.
   * @static
   * @param {string} plainpassword - plain text to be used in the comparison.
   * @param {string} hashedpassword - hashed value created with the salt.
   * @memberof Helper
   * @returns {boolean} - returns a true or false, depending on the outcome of the comparison.
   */
  static compareHash(plainpassword, hashedpassword) {
    return bcrypt.compareSync(plainpassword, hashedpassword);
  }

  /**
   * It validates a schema and returns a boolean
   * @static
   * @param { Joi } schema - The validation schema.
   * @param { Object } object - The data to be validated
   * @memberof Helper
   * @returns { boolean } - True if validation succeeded, false otherwise
   */
  static async validateInput(schema, object) {
    return schema.validateAsync(object);
  }

  /**
   * Create a signed json web token
   * @param {string | number | Buffer | object} payload - Payload to sign
   * @param {string | number} expiresIn - Expressed in seconds or a string describing a
   * time span. Eg: 60, "2 days", "10h", "7d". Default specified is 2 days.
   * @memberof Helper
   * @returns {string} - JWT token
   */
  static generateToken(payload, expiresIn = "2d") {
    return jwt.sign(payload, SECRET, { expiresIn });
  }

  /**
   * This verify the JWT token with the secret with which the token was issued with
   * @static
   * @param {string} token - JWT Token
   * @memberof Helper
   * @returns {object } - Decoded JWT payload if token is valid
   */
  static verifyToken(token) {
    return jwt.verify(token, SECRET);
  }

  /**
   * Generates a token and add it to the user object.
   * @param {Object} user - new user information
   * @memberof Helper
   * @returns {object} - A new object containing essential user properties and jwt token.
   */
  static addTokenToData(user) {
    const { _id, name, email } = user;
    const token = Helper.generateToken({
      id: _id,
      name,
      email,
    });
    return {
      id: _id,
      name,
      email,
      token,
    };
  }

  /**
   * Generates a JSON response for success scenarios.
   * @static
   * @param {Response} res - Response object.
   * @param {object} options - An object containing response properties.
   * @memberof Helper
   * @returns {JSON} - A JSON success response.
   */
  static successResponse(res, { data, message = SUCCESS_RESPONSE, code = 200 }) {
    return res.status(code).json({
      status: SUCCESS,
      message,
      data,
    });
  }

  /**
   * Generates a JSON response for failure scenarios.
   * @static
   * @param {Request} req - Request object.
   * @param {Response} res - Response object.
   * @param {object} error - The error object.
   * @memberof Helper
   * @returns {JSON} - A JSON failure response.
   */
  static errorResponse(req, res, error) {
    const aggregateError = { ...serverError, ...error };
    Helper.apiErrLogMessager(aggregateError, req);
    return res.status(aggregateError.status || 500).json({
      status: FAIL,
      message: aggregateError.message,
      errors: aggregateError.errors,
    });
  }

  /**
   * Creates DB Error object and logs it with respective error message and status.
   * @static
   * @param {object} param0 - The data.
   * @memberof Helper
   * @returns {object} - It returns an Error Object.
   */
  static makeError({ error, status }) {
    const dbError = new DBError({
      status,
      message: error.message,
    });
    Helper.moduleErrLogMessager(dbError);
    return dbError;
  }

  /**
   * Generates log for module errors.
   * @static
   * @param {object} error - The module error object.
   * @memberof Helper
   */
  static moduleErrLogMessager(error) {
    return logger.error(`${error.status} - ${error.name} - ${error.message}`);
  }

  /**
   * Generates log for api errors.
   * @static
   * @private
   * @param {object} error - The API error object.
   * @param {Request} req - Request object.
   * @memberof Helper
   */
  static apiErrLogMessager(error, req) {
    logger.error(
      `${error.name} - ${error.status} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }

  /**
   * Middleware to authenticate requests
   * @static
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @param {Function} next - Next middleware function
   */
  static async authMiddleware(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return Helper.errorResponse(req, res, {
          message: AUTH_ERROR || "Authorization token missing",
          status: 401,
        });
      }

      const token = authHeader.split(" ")[1];
      const decoded = Helper.verifyToken(token);

      const user = await User.findById(decoded.id);
      if (!user) {
        return Helper.errorResponse(req, res, {
          message: "User not found",
          status: 404,
        });
      }

      req.user = user; // attach user to request
      next();
    } catch (err) {
      return Helper.errorResponse(req, res, {
        message: "Invalid or expired token",
        status: 401,
        errors: err.message,
      });
    }
  }
}

export default Helper;
