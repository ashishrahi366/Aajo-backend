const express = require("express");
const router = express.Router();  // Initialize the router
const controller = require("../controllers/property.controller");
const schema = require("../schema/properties.schema");
const validation = require("../middleware/validation");
const { authenticateJWT } = require("../middleware/authorization");

// router.get("/add/properties", controller.addProperty);
router.post("/properties/search", [validation(schema.getLongLatProperty)], controller.getProperties);
router.get("/properties/:propId", [validation(schema.getSingleProperty)], controller.getProprty);


module.exports = router