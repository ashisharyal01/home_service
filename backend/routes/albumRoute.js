const express = require("express");

const router = express.Router();

const galleryController = require("../controllers/galleryController");

router.post("/", galleryController.saveGallery);

router.get("/", galleryController.getGallery);

 router.get("/:albumId", galleryController.getGalleryById);

router.put("/:albumId", galleryController.updateGallery);

router.delete("/:albumId", galleryController.deleteGallery);

module.exports = router;