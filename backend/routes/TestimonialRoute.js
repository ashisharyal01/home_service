const express = require("express");
const router = express.Router();
const TestimonialController = require("../controllers/testimonialController");
const verifyTokenMiddleware = require("../middleware/verifyToken");
const { validateTestimonial } = require("../middleware/FormValidator");

router.post("/", validateTestimonial, TestimonialController.create);
router.get("/", TestimonialController.show);
router.get("/:id", TestimonialController.showById);
router.patch("/:id", validateTestimonial, TestimonialController.update);
router.delete("/:id", TestimonialController.destroy);

module.exports = router;
