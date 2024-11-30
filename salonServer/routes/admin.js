const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const service = require("../controllers/service");
const contact = require("../controllers/contact");
const inquiry = require("../controllers/inquiry");
const image = require("../controllers/images");
const testimonials = require("../controllers/testimonials");
const {
  validateService,
  validateContact,
  validateTestimonial,
} = require("../utils/validateModel");
const passport = require("passport");
const multer = require("../multer/index");

router.put(
  "/contact/:id",
  passport.authenticate("jwt", { session: false }),
  validateContact,
  catchAsync(contact.updateContact)
);

router.post(
  "/services",
  passport.authenticate("jwt", { session: false }),
  validateService,
  catchAsync(service.addService)
);
router.put(
  "/services/:id",
  passport.authenticate("jwt", { session: false }),
  validateService,
  catchAsync(service.updateService)
);
router.delete(
  "/services/:id",
  passport.authenticate("jwt", { session: false }),
  catchAsync(service.deleteService)
);

router.get(
  "/inquiry",
  passport.authenticate("jwt", { session: false }),
  catchAsync(inquiry.getInquiries)
);
router.delete(
  "/inquiry/:id",
  passport.authenticate("jwt", { session: false }),
  catchAsync(inquiry.deleteInquiry)
);

router.get(
  "/testimonials",
  passport.authenticate("jwt", { session: false }),
  catchAsync(testimonials.getPendingTestimonials)
);
router.put(
  "/testimonials",
  passport.authenticate("jwt", { session: false }),
  validateTestimonial,
  catchAsync(testimonials.storeTestimonial)
);
router.delete(
  "/pendingtestimonials/:id",
  passport.authenticate("jwt", { session: false }),
  catchAsync(testimonials.deleteTestimonial)
);
router.delete(
  "/storedtestimonials/:id",
  passport.authenticate("jwt", { session: false }),
  catchAsync(testimonials.deleteSTestimonial)
);

router.post(
  "/image",
  passport.authenticate("jwt", { session: false }),
  multer.single("image"),
  catchAsync(image.saveImage)
);
router.delete("/image/:id", catchAsync(image.deleteImage));

module.exports = router;
