const express = require("express")
const router = express.Router();
const URL = require('../models/url')

router.get("/", async (req, res) => {
    if (!req.user) return res.redirect("/login");
    //earlier we were finding all urls, but now we have to find the urls of a particular user only
    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allurls,
    });
});
router.get('/login', async (req, res) => {
    return res.render("login")
})
router.get('/signup', async (req, res) => {
    return res.render("signup")
})

module.exports = router