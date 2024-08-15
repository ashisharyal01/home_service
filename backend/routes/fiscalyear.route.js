const express = require('express');
const fiscalyearController = require('../controllers/fiscalyear.controller');
const verifyTokenMiddleware =require('../middleware/verifyToken');
const {validateFiscalYear}  = require('../middleware/FormValidator');
const router = express.Router();

router.post('/',verifyTokenMiddleware.verifyToken,validateFiscalYear,fiscalyearController.savefiscalyear);
router.post('/fiscalOrder',verifyTokenMiddleware.verifyToken,fiscalyearController.FilterByFiscalYear);
router.patch('/:id',verifyTokenMiddleware.verifyToken,validateFiscalYear,fiscalyearController.updatefiscalyear);
router.patch('/updateFiscalYearState/:id',verifyTokenMiddleware.verifyToken,fiscalyearController.updateFiscalYearState);
router.get('/',verifyTokenMiddleware.verifyToken,fiscalyearController.getfiscalyear);
router.get('/:id',fiscalyearController.showfiscalyearById);
router.delete('/:id',verifyTokenMiddleware.verifyToken,fiscalyearController.deletefiscalyear);

module.exports = router