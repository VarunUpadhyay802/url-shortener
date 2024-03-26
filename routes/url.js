const express = require('express')
const { handleGenerateNewShortURL, handleRedirectToOriginal ,handleGetAnalytics} = require('../controllers/url')
const router = express.Router();

router.post("/", handleGenerateNewShortURL)
router.get("/:shortId", handleRedirectToOriginal)
router.get("/analytics/:shortId", handleGetAnalytics)
module.exports = router