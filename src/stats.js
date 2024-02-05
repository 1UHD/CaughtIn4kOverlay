let api_key = "add api key here"

const star_colors = [
    ["gray"],
    ["white"],
    ["gold"],
    ["aqua"],
    ["green"],
    ["turquoise"],
    ["c00000"],
    ["ff5dff"],
    ["5f5fff"],
    ["purple"],
    ["ff5e5e", "gold", "yellow", "6aff6a", "aqua", "ff5dff", "purple"]
]

let mojang_api_reachable = true
let hypixel_api_reachable = true
let isNicked = false
let player_stats = []

function log(message) {
    var time = new Date().toLocaleTimeString()
    console.log(`[${time}] ${message}`)
}

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

function star_color(stars) {
    var prestige = Math.floor(stars / 100)
    stars = `[${stars}✫]`

    if(prestige < 10) {
        var color = star_colors[prestige]
        var formatted_stars = {"text":[stars], "colors":color}
    } else {
        var color = star_colors[10]
        var stars_array = stars.split("")
        var formatted_stars = {"text":stars_array, "colors":color}
    }

    return formatted_stars
}

/*
function rank_name_color(rank, name) {
    var formatted_rank = ""
    var name_color = ""

    switch(rank) {
        case undefined:

    }
}
*/

function check_user_uuid(name) {
    log(`Getting UUID of ${name}`)
    return fetch(`https://api.mojang.com/users/profiles/minecraft/${name}?`)
    .then(function(response) {

        if(!response.ok) {
            log("Mojang API not reachable.")
            mojang_api_reachable = false

        } else if(response.status === 429) {
            log("Mojang API ratelimited.")
            mojang_api_reachable = false

        } else {
            mojang_api_reachable = true
        }
        return response.json()
    })
}

function check_hypixel_stats(uuid) {
    if(mojang_api_reachable) {
        return fetch(`https://api.hypixel.net/player?key=${api_key}&uuid=${uuid}`)
        .then(function(response) {

            if(!response.ok) {
                log("Hypixel API not reachable.")
                hypixel_api_reachable = false

            } else if(response.status === 429) {
                log("Hypixel API ratelimited.")
                hypixel_api_reachable = false

            } else {
                hypixel_api_reachable = true
            }
            return response.json()
        })
    } else {
        isNicked = true
    }
}

function get_player_stats(ign) {
    check_user_uuid(ign)
    .then(function(uuid) {
        return check_hypixel_stats(uuid.id)
    })
    .then(function(data) {
        if(!isNicked) {
            try {
            let star = data.player.achievements.bedwars_level
            let finals = data.player.stats.Bedwars.final_kills_bedwars
            let finaldeaths = data.player.stats.Bedwars.final_deaths_bedwars
            let fkdr = parseFloat((finals / finaldeaths).toFixed(2))

            let beds = data.player.stats.Bedwars.beds_broken_bedwars
            let bedslost = data.player.stats.Bedwars.beds_lost_bedwars
            let bblr = parseFloat((beds / bedslost).toFixed(2))

            let wins = data.player.stats.Bedwars.wins_bedwars
            let losses = data.player.stats.Bedwars.losses_bedwars
            let wlr = parseFloat((wins / losses).toFixed(2))

            let winstreak = data.player.stats.Bedwars.winstreak_bedwars

            let name = data.player.displayname
            let rank = data.player.newPackageRank
            let index = Math.round((star * fkdr*fkdr) / 10)


            var stars = star_color(star)

            //log(`[${star}] [${rank}] ${name} | ${finals} | ${fkdr} | ${wins} | ${wlr} | ${index}`)
            add_row([stars, `[${rank}] ${name}`, index, 0, finals, fkdr, wins, wlr])
            
            } catch(error) {
                log(`${ign} exists but has never joined Hypixel.`)
                isNicked = false
            }
        } else {
            log(`${ign} is nicked.`)
            isNicked = false
        }
    })
}

search_player.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        get_player_stats(document.getElementById("search_player").value)
    }
})