// routes/gcs.js
const express = require("express");
const router = express.Router();
const { Storage } = require("@google-cloud/storage");
require("dotenv").config();

const storage = new Storage({ keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS });
const bucket = storage.bucket(process.env.GCS_BUCKET);

router.get("/upload-url", async (req, res) => {
  try {
    const { fileName, contentType } = req.query;

    if (!fileName || !contentType) {
      return res.status(400).json({ error: "Missing fileName or contentType" });
    }

    const file = bucket.file(fileName);

    const [uploadUrl] = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,
      contentType,
    });

    const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${fileName}`;

    res.json({ uploadUrl, publicUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
