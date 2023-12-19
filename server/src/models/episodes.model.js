const mongoose = require("mongoose");
const episodeSchema = mongoose.Schema(
  {
    episodeName: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Done",
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

const Episodes = mongoose.model("Episodes", episodeSchema);

module.exports = Episodes;
