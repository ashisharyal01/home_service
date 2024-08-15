const express = require('express');
const transaction = require('../controllers/transaction.controller');
const verifyTokenMiddleware =require('../middleware/verifyToken');
const router = express.Router();

router.post('/',verifyTokenMiddleware.verifyToken,transaction.saveTransaction);
router.get('/',verifyTokenMiddleware.verifyToken,transaction.getTransaction);
router.get('/:id',verifyTokenMiddleware.verifyToken,transaction.getTransactionById);


module.exports = router