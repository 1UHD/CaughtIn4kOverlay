let api_key = "0d20707f-73b2-44e9-8670-763e042fa840"

let mojang_api_reachable = true
let hypixel_api_reachable = true
let isNicked = false
let player_stats = []

function log(message) {
    var time = new Date().toLocaleTimeString()
    console.log(`[${time}] ${message}`)
}

function add_row(stats) {
    const table = document.getElementById("stats")

    const row = document.createElement("tr")

    stats.forEach(function(cellData){
        const cell = document.createElement("td")
        cell.textContent = cellData
        row.appendChild(cell)
    })

    table.appendChild(row)
}

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

            let name = data.player.displayname
            let rank = data.player.newPackageRank
            let index = Math.round((star * fkdr*fkdr) / 10)

            log(`[${star}] [${rank}] ${name} | ${finals} | ${fkdr} | ${bblr} | ${wins} | ${wlr} | ${index}`)
            add_row([`[${star}] [${rank}] ${name}`, finals, fkdr, bblr, wins, wlr, index])
            
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

var textbox = document.getElementById("add_player_input")
document.getElementById("add_player_button").addEventListener("click", function() {
    get_player_stats("iUHD")
})
