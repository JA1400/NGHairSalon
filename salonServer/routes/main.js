const express = require("express");
const router = express.Router();
const main = require("../controllers/main");
const catchAsync = require("../utils/catchAsync");
const { validateInquiry } = require("../utils/validateModel");

router.get("/image", catchAsync(main.getImages));

router.get("/contact", catchAsync(main.getContactInfo));

router.get("/storedtestimonial", catchAsync(main.getTestimonials));

router.get("/service", catchAsync(main.getServices));

router.post("/inquiry", validateInquiry, catchAsync(main.sendInquiry));

module.exports = router;
