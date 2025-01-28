import express from "express";
import { getData, filter, getHome } from "@hydralerne/youtube-api";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/stream/:url", async (req, res) => {
  const videoId = req.params.url; // Ambil URL video dari parameter query

  const formats = await getData(videoId);
  const bestAudio = filter(formats, "bestaudio", {
    minBitrate: 128000,
    codec: "mp4a",
  });
  res.json(bestAudio);
});

app.get("/explore", async (req, res) => {
  const homeData = await getHome();
  res.json(homeData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
