const { ipcRenderer } = require("electron")
const ipc = ipcRenderer

//TITLEBAR

custom_minimize_button.addEventListener("click", function() {
    ipc.send("minimizeApp")
})

custom_close_button.addEventListener("click", function() {
    ipc.send("closeApp")
})

//SIDEBAR MENU

var menu_visible = false

var menu = document.querySelector(".menu")

let menu_buttons = [
    profile_button,
    settings_button,
    shortcuts_button,
    appearance_button,
    antisniper_button,
]

let menus = [
    profile_menu = document.querySelector(".profile_menu"),
    settings_menu = document.querySelector(".settings_menu"),
    shortcuts_menu = document.querySelector(".shortcuts_menu"),
    appearance_menu = document.querySelector(".appearance_menu"),
    antisniper_menu = document.querySelector(".antisniper_menu"),
]

menu_button.addEventListener("click", function() {
    if(menu_visible) {
        menu.style.left = "-250px"
        for(let i = 0; i < 5; i++) {
            menus[i].style.left = "-100vw"
            menu_buttons[i].style.background = "var(--sidebar-color)"
        }

        menu_visible = false
    } else {
        menu.style.left = 0
        menu_visible = true
    }
})

for(let i = 0; i < 5; i++) {
    menu_buttons[i].addEventListener("click", function() {
        if(menu_visible) {
            for(let j = 0; j < 5; j++) {
                menus[j].style.left = "-100vw"
                menu_buttons[j].style.background = "var(--sidebar-color)"
            }
            menus[i].style.left = "250px"
            menu_buttons[i].style.background = "var(--options-color)"
        }
    })
}

//SIDEBAR OPTIONS MENUS

//APPEARANCE

//FONT FAMILY CHANGER
var fonts = [
    "Minecraft",
    "Menlo",
    "Poppins"
]

var font_buttons = [
    font_family_button_minecraft,
    font_family_button_menlo,
    font_family_button_poppins
]

for(let i = 0; i < 3; i++) {
    font_buttons[i].addEventListener("click", function() {
        document.documentElement.style.setProperty("--font-minecraft", '"' + fonts[i] + '", sans-serif')
    })
}

//FONT COLOR CHANGER