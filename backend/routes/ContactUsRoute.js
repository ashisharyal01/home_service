const express= require('express');
const router= express.Router();
const ContactUsController = require('../controllers/contactUsController');


 router.post("/", ContactUsController.create);
router.get("/",ContactUsController.show);
router.get("/:id",ContactUsController.showById);
 router.delete("/:id",ContactUsController.destroy);

module.exports = router;