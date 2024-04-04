const express = require("express")
const router = express.Router();
const URL = require('../models/url')
router.get('/', async (req, res) => {

    const allurls = await URL.find({})
    return res.render("home", {
        urls: allurls
    })

})
router.get('/signup', async (req, res) => {

    // const xyz = req.body
    return res.render("signup", {
        // urls: allurls
    })

})

module.exports = router