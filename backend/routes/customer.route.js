const express = require('express');
const customerController = require('../controllers/customer.controller');
const verifyTokenMiddleware =require('../middleware/verifyToken');
const {validateCustomer}  = require('../middleware/FormValidator');
const router = express.Router();

router.post('/',verifyTokenMiddleware.verifyToken,validateCustomer,customerController.saveCustomer);
router.get('/filter',verifyTokenMiddleware.verifyToken,validateCustomer,customerController.FilterCustomer);
router.patch('/:id',verifyTokenMiddleware.verifyToken,validateCustomer,customerController.updateCustomer);
router.get('/',verifyTokenMiddleware.verifyToken,customerController.getCustomer);
router.get('/transaction/:id',verifyTokenMiddleware.verifyToken,customerController.getCustomerByTransaction);
router.get('/order/:id',verifyTokenMiddleware.verifyToken,customerController.getCustomerByOrder);
router.get('/:id',customerController.showCustomerById);
router.delete('/:id',verifyTokenMiddleware.verifyToken,customerController.deleteCustomer);

module.exports = router