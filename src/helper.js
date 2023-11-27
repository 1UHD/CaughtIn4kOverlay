let can_change_menu = true
let selected_gamemode = "BedWars"

let menus = [
    "pstats",
    "psearch",
    "pgamemode",
    "psettings",
    "psession",
    "pclient"
]

let menu_buttons = [
    bstats = document.getElementById("bstats"),
    bsearch = document.getElementById("bsearch"),
    bgamemode = document.getElementById("bgamemode"),
    bsettings = document.getElementById("bsettings"),
    bsession = document.getElementById("bsession"),
    bclient = document.getElementById("bclient"),
]


for(let i = 0; i < 6; i++) {
    menu_buttons[i].addEventListener("click", function() {
        if(can_change_menu) {
            for(let j = 0; j < 6; j++) {
                document.querySelector(`.${menus[j]}`).style.visibility = "hidden"
            }
            document.querySelector(`.${menus[i]}`).style.visibility = "visible"
        }
    })
}

gamemode_dropdown_button.addEventListener("click", function() {
    can_change_menu = false
    document.querySelector(".gamemode_dropdown_options").style.visibility = "visible"
    document.querySelector(".gamemode_dropdown").style.border = "2px solid rgb(212, 212, 212)"
    document.querySelector(".gamemode_dropdown").style.borderRadius = "10px"
    document.getElementById("gamemode_dropdown_button").style.border = "none"
})

gamemode_dropdown_option_bedwars.addEventListener("click", function() {
    document.querySelector(".gamemode_dropdown_options").style.visibility = "hidden"
    document.querySelector(".gamemode_dropdown").style.border = "none"
    document.getElementById("gamemode_dropdown_button").style.border = "2px solid rgb(212, 212, 212)"
    document.getElementById("gamemode_dropdown_button").style.borderRadius = "10px"
    document.getElementById("gamemode_dropdown_button").innerText = "BedWars"
    document.getElementById("bgamemode").innerHTML = "<i class='fa fa-rocket'></i> BedWars"
    document.getElementById("th1").innerText = "Stars"
    document.getElementById("th2").innerText = "Name"
    document.getElementById("th3").innerText = "FKDR"
    document.getElementById("th4").innerText = "Finals"
    document.getElementById("th5").innerText = "Beds"
    document.getElementById("th6").innerText = "Wins"
    can_change_menu = true
    selected_gamemode = "BedWars"
})

gamemode_dropdown_option_skywars.addEventListener("click", function() {
    document.querySelector(".gamemode_dropdown_options").style.visibility = "hidden"
    document.querySelector(".gamemode_dropdown").style.border = "none"
    document.getElementById("gamemode_dropdown_button").style.border = "2px solid rgb(212, 212, 212)"
    document.getElementById("gamemode_dropdown_button").style.borderRadius = "10px"
    document.getElementById("gamemode_dropdown_button").innerText = "SkyWars"
    document.getElementById("bgamemode").innerHTML = '<i class="fa fa-rocket"></i> SkyWars'
    document.getElementById("th1").innerText = "Level"
    document.getElementById("th2").innerText = "Name"
    document.getElementById("th3").innerText = "KDR"
    document.getElementById("th4").innerText = "Kills"
    document.getElementById("th5").innerText = "WLR"
    document.getElementById("th6").innerText = "Wins"
    can_change_menu = true
    selected_gamemode = "SkyWars"
})

settings_options_visuals_bgalpha_drawbar.addEventListener("input", function() {
    document.querySelector(".sidebar").style.backgroundColor = `rgba(36, 36, 36, ${settings_options_visuals_bgalpha_drawbar.value / 10})`
    document.querySelector("body").style.backgroundColor = `rgba(51, 51, 51, ${settings_options_visuals_bgalpha_drawbar.value / 10})`
    document.querySelector(".titlebar").style.backgroundColor = `rgba(0, 0, 0, ${settings_options_visuals_bgalpha_drawbar.value / 10})`
})