const express = require("express");

const router = express.Router();

const fileuploadController = require("../controllers/fileUploadController");

const upload = require("../middleware/imageUpload");

router.post("/single", upload.single('image'), fileuploadController.singleFileUpload);

router.post("/multiple", upload.array('images',10), fileuploadController.multipleFileUpload);

router.get("/", fileuploadController.getFiles);

router.get("/:fileId", fileuploadController.getFileById);

 router.delete("/:fileId", fileuploadController.deleteFile);

module.exports = router;


//about us
//imageId type integer
//title type string
//desc type text