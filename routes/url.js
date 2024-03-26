const express = require('express')
const { handleGenerateNewShortURL, handleRedirectToOriginal } = require('../controllers/url')
const router = express.Router();

router.post("/", handleGenerateNewShortURL)
router.get("/:shortId", handleRedirectToOriginal)
module.exports = router