import express from "express";
import multer from "multer";
import ffmpeg from "fluent-ffmpeg";


import { addVideo, addView, getByTag, getVideo, random, search, sub, trend } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

const upload = multer();

//create a video
router.post("/", verifyToken, addVideo)
// router.post("/newvideo", addNewVideo)
router.put("/:id", verifyToken, addVideo)
router.delete("/:id", verifyToken, addVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub", verifyToken, sub)
router.get("/tags", getByTag)
router.get("/search", search);

router.post('/processVideo', upload.single('video'), async (req, res) => {
  console.log("processVideo", req);
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }



  const inputBuffer = req.file.buffer;

  const videoSettings = {
    resolution: req.body.resolution || '720p',
    bitrate: req.body.bitrate || '1000k',
    codec: req.body.codec || 'h264',
    fps: req.body.fps || 30,
  };

  try {
    const outputBuffer = await adjustVideoQuality(inputBuffer, videoSettings);
    res.contentType('video/mp4');
    res.end(outputBuffer, 'binary');
  } catch (error) {
    console.error('Error processing video:', error);
    res.status(500).send('Internal Server Error');
  }
});

function adjustVideoQuality(inputBuffer, settings) {
  return new Promise((resolve, reject) => {
    const ffmpegCommand = ffmpeg()
      .inputFormat('mp4')
      .input('pipe:0')
      .videoCodec(settings.codec)
      .size(settings.resolution)
      .videoBitrate(settings.bitrate)
      .fps(settings.fps)
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .toFormat('mp4')
      .outputOptions('-movflags frag_keyframe+empty_moov')
      .pipe();

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      // Handle the error, log it, or exit the process
    });

    ffmpegCommand.stdin.write(inputBuffer);
    ffmpegCommand.stdin.end();
    let chunks = [];
    ffmpegCommand.stdout.on('data', (chunk) => chunks.push(chunk));
    ffmpegCommand.stdout.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

export default router;