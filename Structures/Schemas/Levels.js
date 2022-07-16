const { model, Schema } = require("mongoose")

module.exports = model("level-config", new Schema({

    Guild: String,
    Data: String

}))
