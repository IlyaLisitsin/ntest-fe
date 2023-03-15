const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConfigSchema = new Schema({
    title: {type: String, default: null},
    json: {type: String, default: null},
}, { timestamps: true });

module.exports.Config = mongoose.model("Config", ConfigSchema);
