document.getElementById("buttonminimize").addEventListener("click", function() {
  //electron.ipcRenderer.send("minimizeApp")
  alert("Test")
})

buttonclose.addEventListener("click", function() {
  //electron.ipcRenderer.send("minimizeApp")
  alert("Test")
})

let can_change_menu = true

let pageButtons = ["stats","search","gamemode","settings","session","client"]
pageButtons.forEach((pageName) => {
  let page = document.querySelector(".b" + pageName)
  page.addEventListener("click", showPage("p" + pageName))
})

function showPage(pageClass) {
  if (!can_change_menu) {
    return
  }

  let pages = document.querySelector(".mainframe").children
  Array.from(pages).forEach((page) => {
    if (page.classList.contains(pageClass)) {
      page.classList.remove("hidden");
    } else {
      page.classList.add("hidden")
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

settings_options_visuals_bgalpha_drawbar.addEventListener("input", function() {
  document.getElementById("settings_options_visuals_alpha").innerText = `Background Alpha [${settings_options_visuals_bgalpha_drawbar.value / 10}]:`
  document.querySelector(".sidebar").style.backgroundColor = `rgba(36, 36, 36, ${settings_options_visuals_bgalpha_drawbar.value / 10})`
  document.getElementById("bstats").style.backgroundColor = `rgba(36, 36, 36, ${settings_options_visuals_bgalpha_drawbar.value / 10})`
  document.getElementById("bsearch").style.backgroundColor = `rgba(36, 36, 36, ${settings_options_visuals_bgalpha_drawbar.value / 10})`
  document.getElementById("bgamemode").style.backgroundColor = `rgba(36, 36, 36, ${settings_options_visuals_bgalpha_drawbar.value / 10})`
  document.getElementById("bsettings").style.backgroundColor = `rgba(36, 36, 36, ${settings_options_visuals_bgalpha_drawbar.value / 10})`
  document.getElementById("bsession").style.backgroundColor = `rgba(36, 36, 36, ${settings_options_visuals_bgalpha_drawbar.value / 10})`
  document.getElementById("bclient").style.backgroundColor = `rgba(36, 36, 36, ${settings_options_visuals_bgalpha_drawbar.value / 10})`
  document.querySelector("body").style.backgroundColor = `rgba(36, 36, 36, ${settings_options_visuals_bgalpha_drawbar.value / 10})`
})
