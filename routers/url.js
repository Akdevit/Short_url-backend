const express = require("express");
const { handleGenratenewShortUrl } = require("../controllers/url");
const router = express.Router();


router.post("/", handleGenratenewShortUrl);

module.exports = router;