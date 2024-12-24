const shortid = require("shortid");
const URL = require("../module/url");

async function handleGenratenewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({
      error: "No url provided",
    });
  }
  const shortID = shortid.generate();

  await URL.create({
    shortid: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

module.exports = {
  handleGenratenewShortUrl,
};
