const express=require("express");
const router=express.Router();
const ourServiceController=require('../controllers/ourserviceController');
router.post("/", ourServiceController.create);
 router.get("/",ourServiceController.show);
 router.get("/:id",ourServiceController.showById);
module.exports=router;