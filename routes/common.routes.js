const express = require("express");
const router = express.Router();  // Initialize the router
const controller = require("../controllers/property.controller");
const schema = require("../schema/properties.schema");
const validation = require("../middleware/validation");
const { authenticateJWT } = require("../middleware/authorization");

router.get("/common/states", [], controller.states);
router.get("/common/country", [], controller.countries);


module.exports = router;