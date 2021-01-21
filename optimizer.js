// std libs
const fs = require('fs');
const path = require('path');

// libs
const sharp = require('sharp');

// settings
const INPUT_PATH = path.join(__dirname, '_input');
const OUTPUT_PATH = path.join(__dirname, '_output');
const ALLOWED_EXTENSIONS = ['gif', 'png', 'jpg', 'jpeg', 'webp'];

// main
const main = async () => {
  
  // read file list
  const files = fs.readdirSync(INPUT_PATH);

  for (const fileName of files) {
    const fileExt = fileName.split('.')[fileName.split('.').length-1].toLowerCase();

    // check if allowed ext
    if (ALLOWED_EXTENSIONS.includes(fileExt)) {

      // build IN and OUT paths
      const filePath = path.join(INPUT_PATH, fileName);
      const outFilePath = path.join(OUTPUT_PATH, fileName);

      // jpg - https://sharp.pixelplumbing.com/api-output#jpeg
      await sharp(filePath)
        .jpeg({quality: 65})
        .toFile(`${outFilePath}.jpg`);
        
      // webp - https://sharp.pixelplumbing.com/api-output#webp
      await sharp(filePath)
        .webp({lossless: false})
        .toFile(`${outFilePath}.webp`);
        
      // png - https://sharp.pixelplumbing.com/api-output#png
      await sharp(filePath)
        .png({quality: 100})
        .toFile(`${outFilePath}.png`);
    }
  }

}

// showtime!
main()