const express = require("express");
const { loginUser , updateUser } = require("../controllers/user.controller");

const router = express.Router();

//login 
router.route("/login").post(loginUser);

//update
router.route("/:userId").put(updateUser)

module.exports = router;
