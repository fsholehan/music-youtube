import express from "express";
import { YtdlCore, toPipeableStream } from "@ybd-project/ytdl-core";

const ytdl = new YtdlCore({
  originalProxy: {
    base: "https://lively-unit-fec6.nsfuad5.workers.dev/",

    download: "https://lively-unit-fec6.nsfuad5.workers.dev/download",

    urlQueryName: "url",
  },
  logDisplay: ["debug", "info", "success", "warning", "error"],

  clients: [
    "web",
    "webCreator",
    "webEmbedded",
    "android",
    "ios",
    "tv",
    "tvEmbedded",
    "mweb",
  ],
});

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/stream/:url", (req, res) => {
  const videoUrl = req.params.url; // Ambil URL video dari parameter query

  if (!videoUrl) {
    return res.status(400).send("Video URL is required");
  }
  res.setHeader("Content-Type", "audio/mp3");

  ytdl
    .download(`https://www.youtube.com/watch?v=${videoUrl}`, {
      filter: "audioonly",
    })
    .then((stream) => {
      toPipeableStream(stream).pipe(res);
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
