const express = require("express");
const shortUrlRouter = express.Router();
const shortUrlController = require("../controllers/shortUrlController");

shortUrlRouter.get("/:shortUrl", shortUrlController.getShortUrlHandler);

shortUrlRouter.post("/", shortUrlController.postShortUrlHandler);

module.exports = shortUrlRouter;
