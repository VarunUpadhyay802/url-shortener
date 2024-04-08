const express = require("express")
const router = express.Router();
const URL = require('../models/url');
const { restrictTo } = require("../middleware/auth");

router.get("/", restrictTo(['NORMAL','ADMIN']),async (req, res) => {
//if you are admin you can view all the urls 
    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render("homeAdmin", {
        urls: allurls,
    });
});
router.get('/admin/urls',restrictTo(['ADMIN']), async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home", {
        urls: allurls
    })
})
router.get('/login', async (req, res) => {
    return res.render("login")
})
router.get('/signup', async (req, res) => {
    return res.render("signup")
})

module.exports = router