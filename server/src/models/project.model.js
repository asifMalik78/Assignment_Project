const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },

    projectEpisodes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Episodes" },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    generalConfiguration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneralConfig",
    },
    displayConfiguration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DisplayConfig",
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
