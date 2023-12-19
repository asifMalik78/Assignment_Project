const User = require("../models/user.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const loginUser = asyncHandler(async (req, res) => {
 
  const { username, email } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "All fields is required");
  }

  const user = await User.findOne({ email });
  if (user) {

    return res
      .status(201)
      .json(
        new ApiResponse(200, { user }, "Logged In Successfully")
      );
  }

  const newUser = await User.create({ username, email });

  return res
    .status(201)
    .json(new ApiResponse(200, { user: newUser }, "Logged In Successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;

  if (!username || !email) {
    throw new ApiError(400, "All fields is required");
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        username,
        email,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(201)
    .json(new ApiResponse(200, { user: updatedUser }, "Updated Successfully"));
});

module.exports = { loginUser, updateUser };
