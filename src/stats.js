//When I wrote this code, only god and I knew how this worked. Now only god knows.

let api_key = "96c2778e-77ec-4d6f-844f-7b5a4f2224b5"

const star_colors = [
    ["gray"],
    ["white"],
    ["gold"],
    ["aqua"],
    ["green"],
    ["#009088"],
    ["#c00000"],
    ["#ff5dff"],
    ["#5f5fff"],
    ["purple"],
    ["#ff5e5e", "gold", "yellow", "#6aff6a", "aqua", "#ff5dff", "purple"]
]


const skill_levels = [
    {"max": 1000, "color": ["#A0A0A0"]},
    {"max": 2500, "color": ["white"]},
    {"max": 5000, "color": ["#41d12e"]},
    {"max": 8000, "color": ["green"]},
    {"max": 12000, "color": ["yellow"]},
    {"max": 18000, "color": ["orange"]},
    {"max": 25000, "color": ["#c00000"]},
    {"max": 6942080085135, "color": ["purple"]}
]

let mojang_api_reachable = true
let hypixel_api_reachable = true
let isNicked = false
let player_stats = []

function log(message) {
    var time = new Date().toLocaleTimeString()
    console.log(`[${time}] ${message}`)
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

function finals_color(finals) {
    for(let i = 0; i < skill_levels.length; i++) {
        if(finals < skill_levels[i]["max"]) {
            finals_color = skill_levels[i]["color"]
            return {text: [finals], colors: [finals_color]}
        }
    }
    finals_color = skill_levels[skill_levels.length - 1]["color"]
    return {text: [finals], colors: [finals_color]}
}

function check_user_uuid(name) {
    log(`Getting UUID of ${name}`)
    return fetch(`https://api.mojang.com/users/profiles/minecraft/${name}?`)
    .then(function(response) {

        if(!response.ok) {
            //add_row(["N/A", name, {text: ["NOT FOUND"], colors: ["#ff5e5e"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
            mojang_api_reachable = false

        } else if(response.status === 429) {
            //add_row(["N/A", name, {text: ["RATELIMIT"], colors: ["#ff5e5e"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
            mojang_api_reachable = false

        } else {
            mojang_api_reachable = true
        }
        return response.json()
    })
    .catch(function(error) {
        //add_row(["N/A", name, {text: ["OFFLINE"], colors: ["#c00000"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
        mojang_api_reachable = false
    })
}

function check_hypixel_stats(uuid) {
    if(mojang_api_reachable) {
        return fetch(`https://api.hypixel.net/player?key=${api_key}&uuid=${uuid}`)
        .then(function(response) {

            if(!response.ok) {
                //add_row(["N/A", "N/A", {text: ["NOT REACHABLE"], colors: ["#ff5e5e"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
                hypixel_api_reachable = false

            } else if(response.status === 429) {
                //add_row(["N/A", "N/A", {text: ["RATELIMIT"], colors: ["#ff5e5e"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
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
    return new Promise(function(resolve) {
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

                    let winstreak = data.player.stats.Bedwars.winstreak
                    
                    let name = data.player.displayname
                    let rank = data.player.newPackageRank
                    let monthlyPackageRank = data.player.monthlyPackageRank
                    let staffRank = data.player.rank
                    let index = Math.round((star * fkdr*fkdr) / 10)

                    var stars = star_color(star)
                    var rank_name = rank_name_color(rank, name, monthlyPackageRank, staffRank)
                    //var formatted_finals = finals_color(finals)

                    //log(`[${star}] [${rank}] ${name} | ${finals} | ${fkdr} | ${wins} | ${wlr} | ${index}`)
                    resolve([stars, rank_name, index, winstreak, finals, fkdr, wins, wlr])
                
                } catch(error) {
                    if(hypixel_api_reachable) {
                        resolve(["N/A", ign, {text: ["NICK_HYPIXEL"], colors: ["purple"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
                    }
                    isNicked = false
                }
            } else {
                if(hypixel_api_reachable) {
                    resolve(["N/A", ign, {text: ["NICK_MOJANG"], colors: ["purple"]}, "N/A", "N/A", "N/A", "N/A", "N/A"])
                }
                isNicked = false
            }
        })
        .catch(function(error) {
            console.error(error)
            return null
        })
    })
}

module.exports = { get_player_stats }