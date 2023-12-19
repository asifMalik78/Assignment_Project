const DisplayConfig = require("../models/displayConfig.model");
const GeneralConfig = require("../models/generalConfig.model");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const updateGeneralConfig = asyncHandler(async function (req, res) {
  const { generalConfigId } = req.params;

  const updatedConfig = await GeneralConfig.findOneAndUpdate(
    { _id: generalConfigId },
    { $set: req.body },
    { new: true }
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { generalConfiguration: updatedConfig },
        "Updated Successfuyyl"
      )
    );
});

const updateDisplayConfig = asyncHandler(async function (req, res) {
  const { displayConfigId } = req.params;

  const updatedConfig = await DisplayConfig.findOneAndUpdate(
    { _id: displayConfigId },
    { $set: req.body },
    { new: true }
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { displConfiguration: updatedConfig },
        "Updated Successfuyyl"
      )
    );
});

module.exports = { updateGeneralConfig, updateDisplayConfig };
