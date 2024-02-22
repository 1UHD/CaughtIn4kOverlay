const fs = require("fs")
const path = require("path")
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

function remove_row(index) {
    let table = document.getElementById("stats_table")
    table.deleteRow(index)
}

function clear_overlay() {
    let table = document.getElementById("stats_table")
    let rows = table.row.length

    for(let i = rows - 1; i > 0; i--) {
        table.deleteRow(i)
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
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

var home_dir = os.homedir()
var logFilePath = path.join(home_dir, ".lunarclient", "offline", "multiver", "logs", "latest.log")

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
                    var result = await get_player_stats(player)
                    await add_row(result)
                    players_in_lobby.push(player)
                }

                checked_lines.push(newest_line)
            } else if(newest_line.includes("has quit") && !checked_lines.includes(newest_line)) {
                var name = newest_line.split(" ")
                var player = name[name.length - 3]

                if(players_in_lobby.includes(player)) {
                    remove_row(players_in_lobby.indexOf(player))
                    players_in_lobby.splice(players_in_lobby.indexOf(player), 1)
                }

                checked_lines.push(newest_line)
            } else if(newest_line.includes("ONLINE") && !checked_lines.includes(newest_line)) {
                let online = newest_line.replace("ONLINE:", ",").split(",")
                online.splice(0, 1)
                online.splice(online.length-1, 1)
                
                for(let i = 0; i < online.length; i++) {
                    if (!players_in_lobby.includes(online[i])) {
                        var result = await get_player_stats(online[i])
                        await add_row(result)
                        players_in_lobby.push(online[i])
                        await sleep(100)
                    }
                }

                checked_lines.push(newest_line)
            } else if(newest_line.includes("by the name of") && !checked_lines.includes(newest_line)) {
                var name = newest_line.split("'")
                var player = name[name.length - 2].replace("!", "")

                if(player === "clear" || player === "c") {
                    await clear_overlay()
                } else {
                    var result = await get_player_stats(player)
                    await add_row(result)
                }
                checked_lines.push(newest_line)
            }
        }
        
    } catch (error) {
        alert("Something went wrong while grabbing Stats")
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