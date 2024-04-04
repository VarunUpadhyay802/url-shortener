const shortid = require('shortid');
const URL = require("../models/url")
//post req like this http://localhost:800/url/
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
    // return res.json({ id: shortID })
    return res.render('home', {
        id: shortID
    })

}
//upto this point a shortid created , now we want get request on that short id so that we get redirect to the original url
//get req like this http://localhost:800/url/peQU9yuyw
async function handleRedirectToOriginal(req, res) {
    const shortId = req.params.shortId;
    //first parameter is to find and second is to update 
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        }
    })

    if (entry) {
        res.redirect(entry.redirectURL)
    }


}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const analytics = await URL.findOne({
        shortId
    })
    return res.json({ totalClicks: analytics.visitHistory.length, analytics: analytics.visitHistory, })

}
module.exports = {
    handleGenerateNewShortURL,
    handleRedirectToOriginal,
    handleGetAnalytics
}