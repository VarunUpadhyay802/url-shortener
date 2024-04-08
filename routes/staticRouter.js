const express = require("express")
const router = express.Router();
const URL = require('../models/url');
const { restrictTo } = require("../middleware/auth");

router.get("/", restrictTo(['NORMAL']),async (req, res) => {

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