const express=require("express");
const verifyTokenMiddleware =require('../middleware/verifyToken');
const router=express.Router();
const paginationController=require('../controllers/paginationController');
 router.get("/",verifyTokenMiddleware.verifyToken,paginationController.GlobalPagination);
module.exports=router;