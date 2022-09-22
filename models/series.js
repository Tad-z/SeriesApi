const mongoose = require("mongoose");

const seriesSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    FavCast: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Series", seriesSchema);