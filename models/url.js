const mongoose = require("mongoose");
// you're using { timestamps: true } to automatically generate timestamps for the documents. 
const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
    },
    //our visitHistory will be array of objects 
    visitHistory: [{
        timestamp: { type: Number },

    }, { timestamps: true }]
})
//mongoose.model() function creates a model based on the schema definition.
// It takes two arguments: the name of the collection (in this case, 'url') and the schema object (urlSchema).
const URL = mongoose.model('url', urlSchema)
module.exports = URL;