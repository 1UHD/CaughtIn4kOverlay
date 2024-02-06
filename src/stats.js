let api_key = "6d86b13b-de83-4f7a-a55c-01548c77730f"

const star_colors = [
    ["gray"],
    ["white"],
    ["gold"],
    ["aqua"],
    ["green"],
    ["turquoise"],
    ["#c00000"],
    ["#ff5dff"],
    ["#5f5fff"],
    ["purple"],
    ["#ff5e5e", "gold", "yellow", "#6aff6a", "aqua", "#ff5dff", "purple"]
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

function rank_name_color(rank, name, monthlyPackageRank, staffRank) {
    var colors = ""
    var formatted_name = ""

    if(monthlyPackageRank === "SUPERSTAR" && staffRank === undefined) {
        colors = ["gold", "gold", "gold", "gold", "#ff5e5e", "#ff5e5e", "gold", "gold"]
        formatted_name = ["[", "M", "V", "P", "+", "+", "] ", name]

        return {text: formatted_name, colors: colors}
    } else if(staffRank !== undefined) {
        switch(staffRank) {
            case "YOUTUBER":
                colors = ["#ff5e5e", "white", "white", "white", "white", "white", "white", "white", "#ff5e5e", "#ff5e5e"]
                formatted_name = ["[", "Y", "O", "U", "T", "U", "B", "E", "] ", name]

                return {text: formatted_name, colors: colors}

            case "GAME_MASTER":
                colors = ["green", "green"]
                formatted_name = ["[GM] ", name]

                return {text: formatted_name, colors: colors}

            case "ADMIN":
                colors = ["#ff5e5e", "#ff5e5e"]
                formatted_name = ["[ADMIN] ", name]

                return {text: formatted_name, colors: colors}
        }
    } else if(rank !== undefined) {
        colors = ["gray"]
        formatted_name = [name]

        switch(rank) {
            case "VIP":
                colors = ["#6aff6a", "#6aff6a"]
                formatted_name = ["[VIP] ", name]
                return {text: formatted_name, colors: colors}  
            
            case "VIP_PLUS":
                colors = ["#6aff6a", "#6aff6a", "#6aff6a", "#6aff6a", "gold", "#6aff6a", "#6aff6a"]
                formatted_name = ["[", "V", "I", "P", "+", "] ", name]
                return {text: formatted_name, colors: colors}  

            case "MVP":
                colors = ["aqua", "aqua"]
                formatted_name = ["[MVP] ", name]
                return {text: formatted_name, colors: colors}  

            case "MVP_PLUS":
                colors = ["aqua", "aqua", "aqua", "aqua", "#ff5e5e", "aqua", "aqua"]
                formatted_name = ["[", "M", "V", "P", "+", "] ", name]
                return {text: formatted_name, colors: colors}  
        }
        return {text: formatted_name, colors: colors}  
    }
}

function check_user_uuid(name) {
    log(`Getting UUID of ${name}`)
    return fetch(`https://api.mojang.com/users/profiles/minecraft/${name}?`)
    .then(function(response) {

        if(!response.ok) {
            //add_row(["N/A", name, {text: ["NOT FOUND"], colors: ["#ff5e5e"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
            mojang_api_reachable = false

        } else if(response.status === 429) {
            add_row(["N/A", name, {text: ["RATELIMIT"], colors: ["#ff5e5e"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
            mojang_api_reachable = false

        } else {
            mojang_api_reachable = true
        }
        return response.json()
    })
    .catch(function(error) {
        add_row(["N/A", name, {text: ["OFFLINE"], colors: ["#c00000"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
        mojang_api_reachable = false
    })
}

function check_hypixel_stats(uuid) {
    if(mojang_api_reachable) {
        return fetch(`https://api.hypixel.net/player?key=${api_key}&uuid=${uuid}`)
        .then(function(response) {

            if(!response.ok) {
                add_row(["N/A", "N/A", {text: ["NOT REACHABLE"], colors: ["#ff5e5e"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
                hypixel_api_reachable = false

            } else if(response.status === 429) {
                add_row(["N/A", "N/A", {text: ["RATELIMIT"], colors: ["#ff5e5e"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
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
            let monthlyPackageRank = data.player.monthlyPackageRank
            let staffRank = data.player.rank
            let index = Math.round((star * fkdr*fkdr) / 10)


            var stars = star_color(star)
            var rank_name = rank_name_color(rank, name, monthlyPackageRank, staffRank)

            //log(`[${star}] [${rank}] ${name} | ${finals} | ${fkdr} | ${wins} | ${wlr} | ${index}`)
            add_row([stars, rank_name, index, 0, finals, fkdr, wins, wlr])
            
            } catch(error) {
                if(hypixel_api_reachable) {
                    add_row(["N/A", ign, {text: ["NICK"], colors: ["purple"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
                }
                isNicked = false
            }
        } else {
            if(hypixel_api_reachable) {
                add_row(["N/A", ign, {text: ["NICK"], colors: ["purple"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
            }
            isNicked = false
        }
    })
}

search_player.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        get_player_stats(document.getElementById("search_player").value)
        document.getElementById("search_player").value = ""
    }
})