const mongoose = require("mongoose");

const generalConfigSchema = mongoose.Schema({
  chatBotName: {
    type: String,

    default: "",
  },

  welcomeMessage: {
    type: String,

    default: "",
  },

  inputPlaceholder: {
    type: String,

    default: "",
  },
});

const GeneralConfig = mongoose.model("GeneralConfig", generalConfigSchema);

module.exports = GeneralConfig;
