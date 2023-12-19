const mongoose = require("mongoose");

const displayConfigSchema = mongoose.Schema({
  primaryColor: {
    type: String,
    default: "#7bd568",
  },

  fontColor: {
    type: String,
    defaut: "#3c3c3c",
  },

  fontSize: {
    type: Number,
    default: 25,
  },

  chatHeight: {
    type: Number,
    default: 50,
  },

  showSources: {
    type: Boolean,
    default: false,
  },

  chatIconSize: {
    type: String,
    enum: ["small", "medium", "large"],
    default: "small",
  },

  screenPosition: {
    type: String,
    enum: ["top left", "top right", "bottom left", "bottom right"],
    default: "bottom right",
  },

  bottomDistance: {
    type: Number,
    default: 20,
  },

  horizontalDistance: {
    type: Number,
    default: 20,
  },

  botIcon: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
});

const DisplayConfig = mongoose.model("DisplayConfig", displayConfigSchema);

module.exports = DisplayConfig;
