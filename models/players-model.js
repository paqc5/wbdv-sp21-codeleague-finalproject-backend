const mongoose = require("mongoose")

const playersSchema = require("./players-schema")
const playersModel = mongoose.model("PlayerModel", playersSchema)

module.exports = playersModel