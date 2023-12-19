const express = require("express");
const {updateDisplayConfig , updateGeneralConfig} = require("../controllers/config.controller")
const router = express.Router();

//update general config
router.route("/general/:generalConfigId").put(updateGeneralConfig)

//update display config
router.route("/display/:displayConfigId").put(updateDisplayConfig)

module.exports = router;