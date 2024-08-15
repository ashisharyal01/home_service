const express = require("express");

const router = express.Router();

const sliderImageController = require("../controllers/sliderImageController");

router.post("/", sliderImageController.saveSlider);
router.get("/", sliderImageController.getSliderImage);

module.exports = router;