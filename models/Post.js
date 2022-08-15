const mongoose = require('mongoose');


const PostSchema = mongoose.Schema(
    {
        author: String,
        title: String,
        content: String,
        last_update: {
            type: Date,
            default: Date.now
        },
        category: String,
        responces: [
            {
                author: String,
                content: String
            }
        ]

    }
);

module.exports = mongoose.model('Posts', PostSchema);
