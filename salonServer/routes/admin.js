const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const service = require("../controllers/service");
const contact = require("../controllers/contact");
const inquiry = require("../controllers/inquiry");
const testimonials = require("../controllers/testimonials");

router.put("/contact/:id", catchAsync(contact.updateContact));

router.post("/services", catchAsync(service.addService));
router.put("/services/:id", catchAsync(service.updateService));
router.delete("/services/:id", catchAsync(service.deleteService));

router.get("/inquiry", catchAsync(inquiry.getInquiries));
router.delete("/inquiry/:id", catchAsync(inquiry.deleteInquiry));

router.get("/testimonials", catchAsync(testimonials.getPendingTestimonials));
router.put("/testimonials", catchAsync(testimonials.storeTestimonial));
router.delete(
  "/pendingtestimonials/:id",
  catchAsync(testimonials.deleteTestimonial)
);
router.delete(
  "/storedtestimonials/:id",
  catchAsync(testimonials.deleteSTestimonial)
);

module.exports = router;
