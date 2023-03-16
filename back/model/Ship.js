const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShipSchema = new Schema({
    model: { type: String, default: '' },
    timesClicked: { type: Number, default: 0 },
}, { timestamps: true });

module.exports.Ship = mongoose.model("Ship", ShipSchema);
