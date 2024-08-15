const express=require("express");
const router=express.Router();
const aboutusController=require('../controllers/aboutusController');
router.post("/", aboutusController.create);
 router.get("/",aboutusController.show);
 router.get("/:id",aboutusController.showById);
 router.delete("/:id",aboutusController.destroy);
module.exports=router;