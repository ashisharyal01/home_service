const express=require("express");
const router=express.Router();
const ourActivityController=require('../controllers/ouractivityController');
router.post("/", ourActivityController.create);
 router.get("/",ourActivityController.show);
 router.get("/:id",ourActivityController.showById);
module.exports=router;