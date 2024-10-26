const express = require("express");
const router = express.Router();  // Initialize the router
const controller = require("../controllers/user.controller");
const schema = require("../schema/user.schema");
const validation = require("../middleware/validation")

router.post("/add/user", [validation(schema.createUser)], controller.createUser);   


module.exports = router