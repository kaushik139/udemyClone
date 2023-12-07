const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const range = require("range-parser");


async function controller(req, res) {
  // console.log(req.params.path);

  const targetFile = req.params.path;
    const videoFilePath = path.join(__dirname, '..', '..', '..', 'public/Videos', targetFile);
    
    const stat = fs.statSync(videoFilePath);
  const fileSize = stat.size;

  console.log('rssssssssssssddddddddddddddddddddddddddssange');
  const { range: reqRange } = req.headers;
    const ranges = range(fileSize, reqRange, { combine: true });
  console.log('rssssssssssssssange');
  
    if (ranges === -1) {
        // 416 Range Not Satisfiable
        res.status(416).end();
        return;
    }
    
    if (ranges === -2 || ranges.type !== "bytes" || ranges.length > 1) {
        // 416 Range Not Satisfiable
        res.status(416).end();
        return;
    }
    
    const { start, end } = ranges[0];

    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoFilePath, { start, end });

    res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      });
    
      file.pipe(res);
    

    
//   if (!fs.existsSync(videoFilePath)) {
//     res.status(404).send('Not Found!');
//     return;
//   }

//   try {
//     const outputFilePath = path.join(__dirname, '..', '..', '..', 'public/Converted', targetFile.replace(/\.[^/.]+$/, '') + '.mp4');

//     // Use FFmpeg to convert the video to MP4
//     await exec(`ffmpeg -i "${videoFilePath}" "${outputFilePath}"`);

//     // Read the converted MP4 video as a buffer
//     const convertedVideoBuffer = fs.readFileSync(outputFilePath);

//     // Send the converted video to the frontend
//     res.status(200).send(convertedVideoBuffer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Conversion and transfer failed.');
//   }
}

module.exports = { controller };
