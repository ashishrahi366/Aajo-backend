const express = require("express");
const router = express.Router();  // Initialize the router
const controller = require("../controllers/property.controller")

router.get("/add/properties", controller.addProperty)


module.exports = router