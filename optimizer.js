// std libs
const fs = require("fs");
const path = require("path");
// libs
const sharp = require("sharp");
// settings
const INPUT_PATH = path.join(__dirname, "_input");
const OUTPUT_PATH = path.join(__dirname, "_output");
const ALLOWED_EXTENSIONS = ["gif", "png", "jpg", "jpeg", "webp"];
// main
const main = async () => {
  // read file list
  const files = await fs.readdirSync(INPUT_PATH, { withFileTypes: true });

  try {
    console.log(files);

    // Get folders within the current directory
    const folders = files.filter((folder) => folder.isDirectory());

    // Optimize each folders and files
    for (const folder of folders) {
      const inputFolderName = path.join(INPUT_PATH, folder.name);
      const outputFolderName = path.join(OUTPUT_PATH, folder.name);

      fs.mkdir(outputFolderName, function (err) {
        if (err) {
          console.log("failed to create directory", err);
        } else {
          console.log("Copy Folder and Optimize files");
          async function copyFolder() {
            const folderFiles = await fs.readdirSync(inputFolderName, {
              withFileTypes: true,
            });
            for (const folderFile of folderFiles) {
              const folderFileName = folderFile.name;
              const folderFileExt = folderFileName
                .split(".")
                [folderFileName.split(".").length - 1].toLowerCase();
              const folderFileTitle = folderFileName.split(".")[
                folderFileName.split(".").length - 2
              ];
              // check if allowed ext
              if (ALLOWED_EXTENSIONS.includes(folderFileExt)) {
                // build IN and OUT paths
                const folderFilePath = path.join(
                  inputFolderName,
                  folderFileName
                );
                const outFolderFilePath = path.join(
                  outputFolderName,
                  folderFileTitle
                );
                // jpg - https://sharp.pixelplumbing.com/api-output#jpeg
                await sharp(folderFilePath)
                  .jpeg({ quality: 65 })
                  .toFile(`${outFolderFilePath}.jpg`);
                // webp - https://sharp.pixelplumbing.com/api-output#webp
                await sharp(folderFilePath)
                  .webp({ lossless: false })
                  .toFile(`${outFolderFilePath}.webp`);
                // png - https://sharp.pixelplumbing.com/api-output#png
                await sharp(folderFilePath)
                  .png({ quality: 100 })
                  .toFile(`${outFolderFilePath}.png`);
              }
            }
          }
          copyFolder();
        }
      });
    }

    // Optimize each files in maun folder
    for (const file of files) {
      console.log("Optimize files");
      const fileName = file.name;
      const fileExt = fileName
        .split(".")
        [fileName.split(".").length - 1].toLowerCase();
      const fileTitle = fileName.split(".")[fileName.split(".").length - 2];
      // check if allowed ext
      if (ALLOWED_EXTENSIONS.includes(fileExt)) {
        // build IN and OUT paths
        const filePath = path.join(INPUT_PATH, fileName);
        const outFilePath = path.join(OUTPUT_PATH, fileTitle);
        // jpg - https://sharp.pixelplumbing.com/api-output#jpeg
        await sharp(filePath)
          .jpeg({ quality: 65 })
          .toFile(`${outFilePath}.jpg`);
        // webp - https://sharp.pixelplumbing.com/api-output#webp
        await sharp(filePath)
          .webp({ lossless: false })
          .toFile(`${outFilePath}.webp`);
        // png - https://sharp.pixelplumbing.com/api-output#png
        await sharp(filePath)
          .png({ quality: 100 })
          .toFile(`${outFilePath}.png`);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
// showtime!
main();
