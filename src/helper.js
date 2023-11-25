let can_change_menu = true

bstats.addEventListener("click", function() {
    if(can_change_menu) {
        document.querySelector(".pstats").style.visibility = "visible"
        document.querySelector(".psearch").style.visibility = "hidden"
        document.querySelector(".pgamemode").style.visibility = "hidden"
        document.querySelector(".psettings").style.visibility = "hidden"
        document.querySelector(".psession").style.visibility = "hidden"
        document.querySelector(".pclient").style.visibility = "hidden"
    }
})

bsearch.addEventListener("click", function() {
    if(can_change_menu) {
        document.querySelector(".pstats").style.visibility = "hidden"
        document.querySelector(".psearch").style.visibility = "visible"
        document.querySelector(".pgamemode").style.visibility = "hidden"
        document.querySelector(".psettings").style.visibility = "hidden"
        document.querySelector(".psession").style.visibility = "hidden"
        document.querySelector(".pclient").style.visibility = "hidden"
    }
})

bgamemode.addEventListener("click", function() {
    if(can_change_menu) {
        document.querySelector(".pstats").style.visibility = "hidden"
        document.querySelector(".psearch").style.visibility = "hidden"
        document.querySelector(".pgamemode").style.visibility = "visible"
        document.querySelector(".psettings").style.visibility = "hidden"
        document.querySelector(".psession").style.visibility = "hidden"
        document.querySelector(".pclient").style.visibility = "hidden"
    }
})

bsettings.addEventListener("click", function() {
    if(can_change_menu) {
        document.querySelector(".pstats").style.visibility = "hidden"
        document.querySelector(".psearch").style.visibility = "hidden"
        document.querySelector(".pgamemode").style.visibility = "hidden"
        document.querySelector(".psettings").style.visibility = "visible"
        document.querySelector(".psession").style.visibility = "hidden"
        document.querySelector(".pclient").style.visibility = "hidden"
    }
})

bsession.addEventListener("click", function() {
    if(can_change_menu) {
        document.querySelector(".pstats").style.visibility = "hidden"
        document.querySelector(".psearch").style.visibility = "hidden"
        document.querySelector(".pgamemode").style.visibility = "hidden"
        document.querySelector(".psettings").style.visibility = "hidden"
        document.querySelector(".psession").style.visibility = "visible"
        document.querySelector(".pclient").style.visibility = "hidden"
    }
})

bclient.addEventListener("click", function() {
    if(can_change_menu) {
        document.querySelector(".pstats").style.visibility = "hidden"
        document.querySelector(".psearch").style.visibility = "hidden"
        document.querySelector(".pgamemode").style.visibility = "hidden"
        document.querySelector(".psettings").style.visibility = "hidden"
        document.querySelector(".psession").style.visibility = "hidden"
        document.querySelector(".pclient").style.visibility = "visible"
    }
})

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
    can_change_menu = true
})

gamemode_dropdown_option_skywars.addEventListener("click", function() {
    document.querySelector(".gamemode_dropdown_options").style.visibility = "hidden"
    document.querySelector(".gamemode_dropdown").style.border = "none"
    document.getElementById("gamemode_dropdown_button").style.border = "2px solid rgb(212, 212, 212)"
    document.getElementById("gamemode_dropdown_button").style.borderRadius = "10px"
    document.getElementById("gamemode_dropdown_button").innerText = "SkyWars"
    document.getElementById("bgamemode").innerHTML = '<i class="fa fa-rocket"></i> SkyWars'
    can_change_menu = true
})