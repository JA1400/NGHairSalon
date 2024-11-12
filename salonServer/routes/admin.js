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
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.put("/contact/:id", validateContact, catchAsync(contact.updateContact));

router.post("/services", validateService, catchAsync(service.addService));
router.put("/services/:id", validateService, catchAsync(service.updateService));
router.delete("/services/:id", catchAsync(service.deleteService));

router.get("/inquiry", catchAsync(inquiry.getInquiries));
router.delete("/inquiry/:id", catchAsync(inquiry.deleteInquiry));

router.get("/testimonials", catchAsync(testimonials.getPendingTestimonials));
router.put(
  "/testimonials",
  validateTestimonial,
  catchAsync(testimonials.storeTestimonial)
);
router.delete(
  "/pendingtestimonials/:id",
  catchAsync(testimonials.deleteTestimonial)
);
router.delete(
  "/storedtestimonials/:id",
  catchAsync(testimonials.deleteSTestimonial)
);

router.post("/image", upload.single("image"), catchAsync(image.saveImage));
router.delete("/image/:id", catchAsync(image.deleteImage));

module.exports = router;
