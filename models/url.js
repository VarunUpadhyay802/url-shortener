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
     //we will provide a id in created by which will be referenced to users
     createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    //our visitHistory will be array of objects 
    visitHistory: [{
        timestamp: { type: Number },

    }, { timestamps: true }]
})
const URL = mongoose.model('url', urlSchema)
module.exports = URL;