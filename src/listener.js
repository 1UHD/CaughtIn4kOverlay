const fs = require("fs")
const os = require("os")

function getOperatingSystem() {
    var platform = navigator.platform.toLowerCase();

    if (platform.includes("win")) {
        return "Windows";
    } else if (platform.includes("mac")) {
        return "MacOS";
    } else if (platform.includes("linux")) {
        return "Linux";
    }
}

var logFilePath = os.homedir + "/.lunarclient/offline/multiver/logs/latest.log"

function readLogFile(callback) {
    fs.readFile(logFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      if (callback) {
        callback(data);
      }
    });
  }
  
module.exports = { readLogFile };