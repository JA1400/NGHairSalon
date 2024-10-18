const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const service = require("../controllers/service");
const contact = require("../controllers/contact");

router.put("/contact/:id", catchAsync(contact.updateContact));

router.post("/services", catchAsync(service.addService));
router.put("/services/:id", catchAsync(service.updateService));
router.delete("/services/:id", catchAsync(service.deleteService));

module.exports = router;
