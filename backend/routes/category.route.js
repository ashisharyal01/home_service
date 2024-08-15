const express = require('express');
const categoryController = require('../controllers/category.controller');
const verifyTokenMiddleware =require('../middleware/verifyToken');
const {validateCategory}  = require('../middleware/FormValidator');
const router = express.Router();

router.patch('/:id',verifyTokenMiddleware.verifyToken,validateCategory,categoryController.updateCategory);
router.post('/',verifyTokenMiddleware.verifyToken,categoryController.saveCategory);
router.get('/paginate',verifyTokenMiddleware.verifyToken,categoryController.paginateCategory);
router.get('/',verifyTokenMiddleware.verifyToken,categoryController.getCategory);
router.get('/:id',categoryController.showCategoryById);
router.delete('/:id',verifyTokenMiddleware.verifyToken,categoryController.deleteCategory);

module.exports = router