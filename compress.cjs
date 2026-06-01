const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputPath = path.join(__dirname, 'public', 'videos', 'hero-1.mp4');
const outputPath = path.join(__dirname, 'public', 'videos', 'hero-1-compressed.mp4');

console.log('Starting compression of hero-1.mp4 (this may take a minute)...');

ffmpeg(inputPath)
  .outputOptions([
    '-vcodec libx264',
    '-crf 28', // Higher means more compression, lower quality. 28 is a good balance for web background.
    '-preset fast',
    '-an' // Remove audio since background videos are muted anyway, saves space.
  ])
  .on('end', () => {
    console.log('Compression finished successfully.');
    // Replace original with compressed
    fs.unlinkSync(inputPath);
    fs.renameSync(outputPath, inputPath);
    console.log('Original file replaced with compressed version.');
  })
  .on('error', (err) => {
    console.error('Error during compression:', err);
  })
  .save(outputPath);
