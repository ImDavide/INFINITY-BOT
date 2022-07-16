const { model, Schema } = require("mongoose")

module.exports = model("level-reward", new Schema({

    Guild: String,
    Level: Number,
    Role: String

}))