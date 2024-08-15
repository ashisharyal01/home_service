const express = require('express');
const itemController = require('../controllers/item.controller');
const verifyTokenMiddleware =require('../middleware/verifyToken');
const {validateItem}  = require('../middleware/FormValidator');
const router = express.Router();

router.post('/',verifyTokenMiddleware.verifyToken,validateItem,itemController.saveItem);
router.patch('/:id',verifyTokenMiddleware.verifyToken,validateItem,itemController.updateItem);
router.get('/',verifyTokenMiddleware.verifyToken,itemController.getItem);
router.get('/:id',itemController.showItemById);
router.delete('/:id',verifyTokenMiddleware.verifyToken,itemController.deleteItem);

module.exports = router