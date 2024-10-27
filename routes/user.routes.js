const express = require("express");
const router = express.Router();  // Initialize the router
const controller = require("../controllers/user.controller");
const schema = require("../schema/user.schema");
const validation = require("../middleware/validation");
const { upload } = require("../utils/fileHandler")

router.post("/user/signup", upload.single("user_image"), [validation(schema.createUser)], controller.createUser);
router.post("/user/update", [validation(schema.updateUser)], controller.updateUser);
router.post("/user/login", [validation(schema.login)], controller.loginUser);


module.exports = router