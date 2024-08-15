const express = require('express');
const userController = require('../controllers/user.controller');
const imageUpload = require('../middleware/imageUpload');
const verifyTokenMiddleware =require('../middleware/verifyToken');
const {validateUser} = require('../middleware/FormValidator')
const router = express.Router();
/**
 * @swagger
 *  components:
 *    schemas:
 *      UserLogin:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            description: User's Email
 *          password:
 *            type: string
 *            description: User's  Password
 *      User:
 *        type: object
 *        required:
 *          - id
 *          - fullName
 *          - email
 *          - password
 *          - mobileNumber
 *          - address
 *          - gender
 *          - dateOfBirth
 *        properties:
 *          fullName:
 *           type: string
 *           description: User's Name
 *          email:
 *           type: string
 *           format: email
 *           description: User's Email
 *          password:
 *           type: string
 *           description: User's Password
 *          mobileNumber:
 *           type: string
 *           description: User's mobileNumber
 *          address:
 *           type: string
 *           description: User's Address
 *          gender:
 *           type: string
 *           enum: ['male','female','others']
 *           description: User's Gender
 *          dateOfBirth:
 *           type: string
 *           format: date
 *           description: User's Date of birth 
 */

/**
 * @swagger
 * tags:
 *     name: Users
 *     description: The user managing API endpoint
 */

/**
 * @swagger
 *  /user:
 *  get:
 *     summary: Returns the list of all the users
 *     tags: [Users]
 *     responses:
 *      200:
 *          description: The list of the users
 */

 router.get('/',userController.show);

/**
 * @swagger
 *  /user/sign-up:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     requestBody:
 *      content:
 *         multipart/form-data:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *     responses:
 *      200:
 *          description: User Created Successfully
 *      500:
 *          description: Some Server Error
 */
 router.post('/sign-up',validateUser,userController.signUp);
/**
 * @swagger
 *  /user/login:
 *   post:
 *     summary: User login to the system
 *     tags: [Users]
 *     requestBody:
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/UserLogin'
 *     responses:
 *      200:
 *          description: User LoggedIn Successfully
 *      500:
 *          description: Some Server Error
 */
router.post('/login',userController.login);

/**
 * @swagger
 *  /user/{userId}:
 *   patch:
 *     summary: Update the user by id
 *     tags: [Users]
 *     security:
 *	     - jwt: []
 *     parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *              type: integer
 *              required: true
 *              description: The user id
 *     requestBody:
 *      content:
 *       multipart/form-data:
 *        schema:
 *          type: object
 *          properties:
 *              fullName:
 *                  type: string
 *                  description: User's Name
 *              email:
 *                  type: string
 *                  format: email
 *                  description: User's Email
 *              phoneNumber:
 *                  type: string
 *                  description: User's phoneNumber
 *              address:
 *                  type: string
 *                  description: User's Address
 *              gender:
 *                  type: string
 *                  enum: ['male','female','others']
 *                  description: User's Gender
 *              dateOfBirth:
 *                  type: string
 *                  format: date
 *                  description: User's Date of birth 
 *     responses:
 *      200:
 *          description: User Updated Successfully
 *      500:
 *          description: Some Server Error
 */
router.patch('/:id',verifyTokenMiddleware.verifyToken,validateUser, userController.update);

/**
 * @swagger
 *  /user/{userId}:
 *  get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *              type: integer
 *              required: true
 *              description: The user id
 *     responses:
 *      200:
 *          description: The user description by id
 *      404:
 *          description: The user was not found
 */
router.get('/:id',verifyTokenMiddleware.verifyToken,userController.showById);

/**
 * @swagger
 *  /user/{userId}:
 *   delete:
 *     summary: Delete the user by id
 *     tags: [Users]
 *     security:
 *	     - jwt: []
 *     parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *              type: integer
 *              required: true
 *              description: The user id
 *     responses:
 *      200:
 *          description: User Deleted Successfully
 *      500:
 *          description: Some Server Error
 */
router.delete('/:id',verifyTokenMiddleware.verifyToken,userController.deleteUser);

module.exports = router