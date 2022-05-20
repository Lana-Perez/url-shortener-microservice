const UrlModel = require("../models/urlModel");
const dns = require("dns");
const dnsPromises = dns.promises;
// find long url in db if it exists and redirect user
function getShortUrlHandler(req, res) {
  UrlModel.findOne({ short_url: req.params.shortUrl })
    .then((found) => {
      return res.redirect(`${found.original_url}`);
    })
    .catch((err) => {
      return res.send(err);
    });
}
async function getNewShortUrl() {
  const latestUrlDoc = await UrlModel.findOne().sort({ short_url: -1 }).exec();
  return latestUrlDoc ? latestUrlDoc.short_url + 1 : 1;
}
async function validateUrl(lookupUrl) {
  try {
    const parsedUrl = new URL(lookupUrl);
    await dnsPromises.lookup(parsedUrl.hostname);
    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
}

async function postShortUrlHandler(req, res) {
  const url = req.body.url;
  const isValid = await validateUrl(url);
  if (isValid) {
    try {
      //if url is valid check if it is already in db. If true - return
      //json {original_url: 'https://www.website.com', short_url: 123}
      const dublicate = await UrlModel.findOne({ original_url: url }).exec();
      if (dublicate) {
        return res.json({
          original_url: dublicate.original_url,
          short_url: dublicate.short_url,
        });
      } else {
        // if no such url in db - getting largest short_url index from db, incrementing it || 1
        // and trying to create new record in db
        const newIndex = await getNewShortUrl();
        const result = await UrlModel.create({
          original_url: url,
          short_url: newIndex,
        });
        return res.json({
          original_url: result.original_url,
          short_url: result.short_url,
        });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } else {
    // If url not valide - {error: 'invalid url'}
    return res.status(400).json({ error: "invalid url" });
  }
}

module.exports = {
  getShortUrlHandler,
  postShortUrlHandler,
};
