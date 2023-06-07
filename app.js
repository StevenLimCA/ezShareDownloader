const http = require("http");
const fs = require("fs");
const cheerio = require("cheerio");

// Define the base URL to iterate over
const baseUrl = "ezshare.card";
const rootUrlPath = "dir?dir=A:";

// Define the output directory for downloaded files
const outputDir = "downloaded_files";

// Set a delay
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const convertTimeStringToDate = (timeString) => {
  const [datePart, timePart] = timeString.split(" ");
  const [year, month, day] = datePart.split("-");
  const [hours, minutes, seconds] = timePart.split(":");

  // JavaScript Date constructor expects month to be zero-based, so subtract 1 from the month value
  return new Date(year, month - 1, day, hours, minutes, seconds);
};

// Download Files
const prepareDownloadFile = async ({ url: href, fileName }) => {
  console.log("Downloading:", href);
  const filePath = `${outputDir}/${fileName}`;

  try {
    await downloadFile(href, filePath);
    console.log(`Downloaded: ${href}`);
  } catch (error) {
    console.error(`Error downloading: ${href}`, error);
  }
};

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// makes an http request to get the file size of the targeted file
const getFileSize = async (url) => {
  return new Promise((resolve, reject) => {
    http
      .request(url, { method: "HEAD" }, (response) => {
        const contentLength = response.headers["content-length"]; // gets the file size
        if (!contentLength) {
          reject("Content-Length header not found");
        }
        resolve(parseInt(contentLength, 10));
      })
      .on("error", (err) => {
        reject(err);
      })
      .end();
  });
};
// this function downloads files, it takes in the url and destination as a parameter
const downloadFile = (url, dest) => {
  return new Promise(async (resolve, reject) => {
    try {
      const serverFileSize = await getFileSize(url);
      console.log("Server file size:", serverFileSize); // gets the file size from the http request

      if (fs.existsSync(dest)) {
        const localFileSize = fs.statSync(dest).size; // gets local file size
        console.log("Local file size:", localFileSize);

        if (localFileSize === serverFileSize || serverFileSize === 147) {
          // Local file already exists with the same size or equal to 147, skip the download
          console.log(
            "A local file with the same name exists that is the same size or higher, skipping download."
          );
          resolve();
          return;
        }
      }

      const file = fs.createWriteStream(dest);
      http
        .get(url, (response) => {
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log("Download completed.");
            resolve();
          });
        })
        .on("error", (err) => {
          fs.unlink(dest, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("File Removed.");
            }
          });
          reject(err.message);
        });
    } catch (error) {
      reject(error);
    }
  });
};
// Get HTML information from ezShare using an HTTP request
const getHtmlInfo = async (url, path) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: url,
      port: 80,
      path: path,
      method: "GET",
    };

    const req = http.request(options, (res) => {
      let resData = "";

      res.on("data", (chunk) => {
        resData += chunk;
      });

      res.on("end", () => {
        resolve(resData);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};

// This function receives HTML and returns a list of directories and files
const getDirListFromHtml = (html) => {
  const retrieveHtml = cheerio.load(html);
  const preElement = retrieveHtml("pre");
  const preTextArr = preElement.first().text().split("\n");

  const entries = { dirs: [], files: [] };

  preElement.find("a").each((index, element) => {
    const href = retrieveHtml(element).attr("href");
    const name = retrieveHtml(element).text().trim();
    const isDirectory = !href.includes("http");

    if (isDirectory) {
      //this filters out any . and .. ensuring that it will not recursive go into the previous folder

      if (name !== "." && name !== "..") {
        entries.dirs.push({ url: href, fileName: name });
      }
    } else {
      // this filters out any file formats not needed

      if (!name.endsWith(".hprj") && !name.endsWith(".cfg")) {
        entries.files.push({ url: href, fileName: name });
      }
    }
  });

  return entries;
};

// Recursively fetches the file structure from directories and subdirectories

const getFileStructure = async (dir, files) => {
  const listOfFileAndFolders = await downloadDirPathParseOutDirAndFileList(dir);

  if (listOfFileAndFolders.dirs.length === 0) {
    files.push(...listOfFileAndFolders.files);
  } else {
    for (const folder of listOfFileAndFolders.dirs) {
      await getFileStructure(folder.url, files);
    }
    files.push(...listOfFileAndFolders.files);
  }
};

const downloadDirPathParseOutDirAndFileList = async (path) => {
  try {
    const html = await getHtmlInfo(baseUrl, path);
    const dirList = getDirListFromHtml(html);
    return dirList;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};

const getAllFiles = async () => {
  const allFiles = [];
  await getFileStructure(rootUrlPath, allFiles);

  for (const file of allFiles) {
    await delay(1000); // one and a half seconds delay to not overload the server

    await prepareDownloadFile(file);
  }
};

getAllFiles();
