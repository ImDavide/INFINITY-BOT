const mongoose = require("mongoose")

const VerificationModel = mongoose.model(
    "verifications",
    new mongoose.Schema({
    Guild: String,
    Role: String,
    Channel: String,

    })
)

module.exports = VerificationModel