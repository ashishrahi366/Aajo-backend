const express = require("express");
const router = express.Router();  // Initialize the router
const controller = require("../controllers/user.controller");
const schema = require("../schema/user.schema");
const validation = require("../middleware/validation");
const { authenticateJWT } = require("../middleware/authorization");
const { upload } = require("../utils/fileHandler")

router.post("/user/signup", upload.single("user_id_doc"), [validation(schema.createUser)], controller.createUser);
router.post("/user/login", [validation(schema.login)], controller.loginUser);
router.post("/user/update", [validation(schema.updateUser), authenticateJWT], controller.updateUser);
router.post("/user/delete/profile-pic", [validation(schema.profilePicDelete), authenticateJWT], controller.deleteProfilePicture);
router.post("/user/add/profile-pic", upload.single("user_image"), [validation(schema.profilePicDelete), authenticateJWT], controller.addProfilePic);


module.exports = router;