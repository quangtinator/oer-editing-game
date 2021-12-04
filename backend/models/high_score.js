const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const high_score_model = new Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        score: Number,
        position: Number
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("HighScore", high_score_model);