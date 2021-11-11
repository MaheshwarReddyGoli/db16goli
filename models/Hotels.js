const mongoose = require("mongoose")
const HotelsSchema = mongoose.Schema({
    roomType: String,
    price: { type: Number, min: 100, max: 500 },
    location: { type: String, minLength: 5 }
})
module.exports = mongoose.model("hotel",
    HotelsSchema)