const os = require("os")
const fs = require("fs")
const path = require("path")

function log(message) {
    var time = new Date().toLocaleTimeString()
    console.log(`[${time}] ${message}`)
}

const user_directory = os.homedir()
const app_folder = path.join(user_directory, ".caughtin4k")
const config_file = path.join(app_folder, "config.txt")

function createConfigFile() {
    if(!fs.existsSync(app_folder)) {
        fs.mkdirSync(app_folder)
        log("[FILE SYSTEM] Created .caughtin4k/ path")
    } else {
        log("[FILE SYSTEM] Path .caughtin4k/ already exists")
    }

    if(!fs.existsSync(config_file)) {
        fs.writeFileSync(config_file, "")
        log("[FILE SYSTEM] Created .caughtin4k/config.txt file")
    } else {
        log("[FILE SYSTEM] File .caughtin4k/config.txt already exists")
    }
}

function writeConfigFile(line, content) {
    const lines = fs.readFileSync(config_file, "utf-8").split("\n")
    lines[line - 1] = content
    fs.writeFileSync(config_file, lines.join("\n"))
    log(`[CONFIG MANAGER] Wrote "${content}" to config file in line ${line}`)
}

function readConfigFile(line) {
    const lines = fs.readFileSync(config_file, "utf-8").split("\n")
    log(`[CONFIG MANAGER] Getting content from line ${line}`)
    return lines[line - 1]
}

createConfigFile()
writeConfigFile(1, "Hello world")
log(readConfigFile(1))