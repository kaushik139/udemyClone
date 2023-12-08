const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const range = require("range-parser");
const chalk = require('chalk');


async function controller(req, res) {
  // console.log(chalk.red(req.headers));

  const targetFile = req.params.path;
    const videoFilePath = path.join(__dirname, '..', '..', '..', 'public/Videos', targetFile);
    
    const stat = fs.statSync(videoFilePath);
  const fileSize = stat.size;

  const { range: reqRange } = req.headers;
  const ranges = range(fileSize, reqRange, { combine: true });
  
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
    
}

module.exports = { controller };
