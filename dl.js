const http = require("http");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// Define the base URL to iterate over
const baseUrl = "http://ezshare.card/dir?dir=A:%5CSTEREO";

// Define the output directory for downloaded files
const outputDir = "downloaded_files";

// Define the allowed File Extensions to be saved

const allowedFileExtension = ".wav";
// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Define a function to download a file from a URL
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    http
      .get(url, (response) => {
        console.log(parseInt(response.headers["content-length"], 10));
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(dest);
        reject(err.message);
      });
  });
}

// Define a function to process a directory listing HTML page
function processDirectoryListingPage(html, folderName) {
  const $ = cheerio.load(html);
  const links = $("a[href]").filter((index, element) => {
    const href = $(element).attr("href");
    return href !== ".." && !href.endsWith("/");
  });

  // Iterate over the links and download the files
  links.each((index, element) => {
    const href = $(element).attr("href");
    const fileName = decodeURIComponent(path.basename(href));
    const longFileName = $(element).text().trim();
    const fileExtension = path.extname(fileName).toLowerCase();
    if (fileExtension === allowedFileExtension) {
      const fileUrl = `${baseUrl}%5C${folderName}%5C${fileName}`;
      const filePath = path.join(outputDir, folderName, longFileName);
      // fs.stat(filePath, (err, stats) => {console.log(stats.size);})
      if (!fs.existsSync(filePath)) {
        console.log(`Downloading file: ${fileName} from ${fileUrl}`);
        downloadFile(href, filePath)
          .then(() => {
            console.log(`File ${fileName} downloaded successfully!`);
          })
          .catch((err) => {
            console.error(`Error downloading file ${fileName}: ${err}`);
          });
      } else {
        console.log(`File ${fileName} already exists, skipping...`);
      }
    }
  });
}

// Iterate over the folder names and process each directory listing page
for (let i = 1; i <= 10; i++) {
  const folderName = `FOLDER${i.toString().padStart(2, "0")}`;
  const folderUrl = `${baseUrl}%5C${folderName}`;
  console.log(`Processing directory listing for folder: ${folderName}`);
  http
    .get(folderUrl, (response) => {
      let html = "";
      response.on("data", (chunk) => {
        html += chunk;
      });
      response.on("end", () => {
        processDirectoryListingPage(html, folderName);
      });
    })
    .on("error", (err) => {
      console.error(
        `Error getting directory listing for folder ${folderName}: ${err}`
      );
    });
}
