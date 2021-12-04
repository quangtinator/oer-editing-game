const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema(
    {
        sub: String,
        name: String,
        preferred_username: String,
        email: String,
        score: Number,
        level: Map
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userModel);