const  shortid  = require('shortid');
const URL = require("../models/url")
async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    //first we will extract url from the body, 
    if (!body.url) return res.status(400).json({ error: 'url is required' })
    //if found , then we will save it to databse with it's shortened version
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    })
    return res.json({ id: shortID })

}
module.exports = {
    handleGenerateNewShortURL,
}