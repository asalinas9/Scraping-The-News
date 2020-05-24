const mongoose = require("mongoose");
const Comment = require("./Comment");

let Schema = mongoose.Schema;
let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    saved: {
        type: Boolean,
        required: true,
        default: false
    },
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;