const fs = require("fs")
const os = require("os")
const { get_player_stats } = require("./stats.js")

let checked_lines = []
let players_in_lobby = []
let delay = 100

function add_row(stats) {
    let table = document.getElementById("stats_table")

    let row = document.createElement("tr")

    stats.forEach(function (cellInfo) {
        let cell = document.createElement("td")

        if (cellInfo && typeof cellInfo === 'object' && cellInfo.text && cellInfo.colors) {
            cellInfo.text.forEach(function (text, index) {
                let span = document.createElement("span")
                span.textContent = text

                let color = cellInfo.colors[index] || 'black'
                span.style.color = color

                cell.appendChild(span)
            });
        } else {
            cell.textContent = cellInfo
        }

        row.appendChild(cell)
    });
    table.appendChild(row)
}

function getOperatingSystem() {
    var platform = navigator.platform.toLowerCase();

    if (platform.includes("win")) {
        return "Windows"
    } else if (platform.includes("mac")) {
        return "MacOS"
    } else if (platform.includes("linux")) {
        return "Linux"
    }
}

var logFilePath = ""
var user_os = getOperatingSystem()
if(user_os === "MacOS" || user_os === "Linux") {
    logFilePath = os.homedir + "/.lunarclient/offline/multiver/logs/latest.log"
} else if(user_os == "Windows") {
    logFilePath = os.homedir + "\\.lunarclient\\offline\\multiver\\logs\\latest.log"
}

function readLogFileAsync() {
    return new Promise((resolve, reject) => {
        fs.readFile(logFilePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

async function get_important_lines() {
    try {
        const data = await readLogFileAsync();
        const lines = data.split("\n");
        const newest_line = lines[lines.length - 2];
        
        if(newest_line.includes("[CHAT]")) {
            if(newest_line.includes("has joined") && !checked_lines.includes(newest_line)) {
                var name = newest_line.split(" ")
                var player = name[name.length - 4]
            
                if(!players_in_lobby.includes(player)) {
                    await add_row([player, 0, 0, 0, 0, 0, 0, 0])
                    players_in_lobby.push(player)
                }

                checked_lines.push(newest_line)
            } else if(newest_line.includes("has quit") && !checked_lines.includes(newest_line)) {
                var name = newest_line.split(" ")
                var player = name[name.length - 3]

                if(players_in_lobby.includes(player)) {
                    players_in_lobby.splice(players_in_lobby.indexOf(player), 1)
                }

                checked_lines.push(newest_line)
            } else if(newest_line.includes("ONLINE") && !checked_lines.includes(newest_line)) {
                await add_row([newest_line, 0, 0, 0, 0, 0, 0, 0])
                checked_lines.push(newest_line)
            } else if(newest_line.includes("by the name of") && !checked_lines.includes(newest_line)) {
                var name = newest_line.split("'")
                var player = name[name.length - 2]

                await add_row([player, 0, 0, 0, 0, 0, 0, 0])

                checked_lines.push(newest_line)
            }
        }
        
    } catch (error) {
        alert("ALARM!")
    }
}

async function check_log() {
    while(true) {
        await get_important_lines()
        await new Promise(resolve => setTimeout(resolve, delay))
    }
}

check_log()

module.exports = { readLogFileAsync };