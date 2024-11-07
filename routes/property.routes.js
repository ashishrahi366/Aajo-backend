const express = require("express");
const router = express.Router();  // Initialize the router
const controller = require("../controllers/property.controller");
const schema = require("../schema/properties.schema");
const validation = require("../middleware/validation");
const { authenticateJWT } = require("../middleware/authorization");
const { upload } = require("../utils/fileHandler")

router.post("/properties/add", upload.array("property_img"), [validation(schema.createProperty), authenticateJWT], controller.addProperty);
router.post("/properties/search", [validation(schema.getLongLatProperty)], controller.getProperties);
router.get("/properties/:propId", [validation(schema.getSingleProperty)], controller.getProprty);
// router.post()  for property cover pic



module.exports = router