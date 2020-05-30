const mongoose = require("mongoose");


let Schema = mongoose.Schema;
let ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true,
    },
    summary: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    link: {
        type: String
    },
    saved: {
        type: Boolean,
        required: true,
        default: false
    },
    note: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});
const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;