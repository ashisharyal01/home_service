const express = require('express');
const orderController = require('../controllers/order.controller');
const verifyTokenMiddleware =require('../middleware/verifyToken');
const {validateOrder}  = require('../middleware/FormValidator');
const router = express.Router();

router.post('/',verifyTokenMiddleware.verifyToken,validateOrder,orderController.saveOrder);
router.patch('/:id',verifyTokenMiddleware.verifyToken,orderController.updateWorkStatus);
router.get('/',verifyTokenMiddleware.verifyToken,orderController.getOrder);
router.get('/:id',verifyTokenMiddleware.verifyToken,orderController.showOrderById);
router.delete('/:id',verifyTokenMiddleware.verifyToken,orderController.deleteOrder);

module.exports = router