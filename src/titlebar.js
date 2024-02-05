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
var red_slider_value = document.getElementById("text_color_red_slider")
var red_slider_value_value = document.getElementById("text_color_red_slider_value")
var green_slider_value = document.getElementById("text_color_green_slider")
var green_slider_value_value = document.getElementById("text_color_green_slider_value")
var blue_slider_value = document.getElementById("text_color_blue_slider")
var blue_slider_value_value = document.getElementById("text_color_blue_slider_value")
var alpha_slider_value = document.getElementById("text_color_alpha_slider")
var alpha_slider_value_value = document.getElementById("text_color_alpha_slider_value")
var hex_value = document.getElementById("text_color_hex_input")

function change_text_color(r, g, b, a) {
    document.documentElement.style.setProperty("--text-color", `rgba(${r}, ${g}, ${b}, ${a})`)
}

function change_text_color_preview(r, g, b, a) {
    document.documentElement.style.setProperty("--text-color-preview", `rgba(${r}, ${g}, ${b}, ${a})`)
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '')

    let bigint = parseInt(hex, 16)
    let r = (bigint >> 16) & 255
    let g = (bigint >> 8) & 255
    let b = bigint & 255

    return [r, g, b]
}

function rgbToHex(r, g, b) {
    r = Math.min(255, Math.max(0, r))
    g = Math.min(255, Math.max(0, g))
    b = Math.min(255, Math.max(0, b))

    let hexR = r.toString(16).padStart(2, '0')
    let hexG = g.toString(16).padStart(2, '0')
    let hexB = b.toString(16).padStart(2, '0')

    let hexColor = `#${hexR}${hexG}${hexB}`

    return hexColor.toUpperCase()
}

text_color_red_slider.addEventListener("input", function() {
    document.getElementById("text_color_red_slider_value").placeholder = red_slider_value.value
    change_text_color_preview(red_slider_value.value, green_slider_value.value, blue_slider_value.value, alpha_slider_value.value)
    document.getElementById("text_color_hex_input").placeholder = rgbToHex(red_slider_value.value, green_slider_value.value, blue_slider_value.value)
})

text_color_green_slider.addEventListener("input", function() {
    document.getElementById("text_color_green_slider_value").placeholder = green_slider_value.value
    change_text_color_preview(red_slider_value.value, green_slider_value.value, blue_slider_value.value, alpha_slider_value.value)
    document.getElementById("text_color_hex_input").placeholder = rgbToHex(red_slider_value.value, green_slider_value.value, blue_slider_value.value)
})

text_color_blue_slider.addEventListener("input", function() {
    document.getElementById("text_color_blue_slider_value").placeholder = blue_slider_value.value
    change_text_color_preview(red_slider_value.value, green_slider_value.value, blue_slider_value.value, alpha_slider_value.value)
    document.getElementById("text_color_hex_input").placeholder = rgbToHex(red_slider_value.value, green_slider_value.value, blue_slider_value.value)
})

text_color_alpha_slider.addEventListener("input", function() {
    document.getElementById("text_color_alpha_slider_value").placeholder = alpha_slider_value.value
    change_text_color_preview(red_slider_value.value, green_slider_value.value, blue_slider_value.value, alpha_slider_value.value)
    document.getElementById("text_color_hex_input").placeholder = rgbToHex(red_slider_value.value, green_slider_value.value, blue_slider_value.value)
})

text_color_red_slider_value.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        red_slider_value.value = red_slider_value_value.value
        red_slider_value_value.value = ""
        document.getElementById("text_color_red_slider_value").placeholder = red_slider_value.value
        change_text_color_preview(red_slider_value.value, green_slider_value.value, blue_slider_value.value, alpha_slider_value.value)
        document.getElementById("text_color_hex_input").placeholder = rgbToHex(red_slider_value.value, green_slider_value.value, blue_slider_value.value)
    }
})

text_color_green_slider_value.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        green_slider_value.value = green_slider_value_value.value
        green_slider_value_value.value = ""
        document.getElementById("text_color_green_slider_value").placeholder = green_slider_value.value
        change_text_color_preview(red_slider_value.value, green_slider_value.value, blue_slider_value.value, alpha_slider_value.value)
        document.getElementById("text_color_hex_input").placeholder = rgbToHex(red_slider_value.value, green_slider_value.value, blue_slider_value.value)
    }
})

text_color_blue_slider_value.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        blue_slider_value.value = blue_slider_value_value.value
        blue_slider_value_value.value = ""
        document.getElementById("text_color_blue_slider_value").placeholder = blue_slider_value.value
        change_text_color_preview(red_slider_value.value, green_slider_value.value, blue_slider_value.value, alpha_slider_value.value)
        document.getElementById("text_color_hex_input").placeholder = rgbToHex(red_slider_value.value, green_slider_value.value, blue_slider_value.value)
    }
})

text_color_alpha_slider_value.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        alpha_slider_value.value = alpha_slider_value_value.value
        alpha_slider_value_value.value = ""
        document.getElementById("text_color_alpha_slider_value").placeholder = alpha_slider_value.value
        change_text_color_preview(red_slider_value.value, green_slider_value.value, blue_slider_value.value, alpha_slider_value.value)
        document.getElementById("text_color_hex_input").placeholder = rgbToHex(red_slider_value.value, green_slider_value.value, blue_slider_value.value)
    }
})

text_color_hex_input.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        let rgb_values = hexToRgb(hex_value.value)
        document.getElementById("text_color_red_slider_value").placeholder = rgb_values[0]
        document.getElementById("text_color_green_slider_value").placeholder = rgb_values[1]
        document.getElementById("text_color_blue_slider_value").placeholder = rgb_values[2]
        red_slider_value.value = rgb_values[0]
        green_slider_value.value = rgb_values[1]
        blue_slider_value.value = rgb_values[2]
        hex_value.value = ""
        change_text_color_preview(red_slider_value.value, green_slider_value.value, blue_slider_value.value, alpha_slider_value.value)
        document.getElementById("text_color_hex_input").placeholder = rgbToHex(red_slider_value.value, green_slider_value.value, blue_slider_value.value)
    }
})

apply_text_color_button.addEventListener("click", function() {
    change_text_color(red_slider_value.value, green_slider_value.value, blue_slider_value.value, alpha_slider_value.value)
})

//HEADING COLOR CHANGER
var heading_red_slider_value = document.getElementById("heading_text_color_red_slider")
var heading_red_slider_value_value = document.getElementById("heading_text_color_red_slider_value")
var heading_green_slider_value = document.getElementById("heading_text_color_green_slider")
var heading_green_slider_value_value = document.getElementById("heading_text_color_green_slider_value")
var heading_blue_slider_value = document.getElementById("heading_text_color_blue_slider")
var heading_blue_slider_value_value = document.getElementById("heading_text_color_blue_slider_value")
var heading_alpha_slider_value = document.getElementById("heading_text_color_alpha_slider")
var heading_alpha_slider_value_value = document.getElementById("heading_text_color_alpha_slider_value")
var heading_hex_value = document.getElementById("heading_text_color_hex_input")

function heading_change_text_color(r, g, b, a) {
    document.documentElement.style.setProperty("--highlight-color", `rgba(${r}, ${g}, ${b}, ${a})`)
}

function heading_change_text_color_preview(r, g, b, a) {
    document.documentElement.style.setProperty("--highlight-color-preview", `rgba(${r}, ${g}, ${b}, ${a})`)
}

heading_text_color_red_slider.addEventListener("input", function() {
    document.getElementById("heading_text_color_red_slider_value").placeholder = heading_red_slider_value.value
    heading_change_text_color_preview(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value, heading_alpha_slider_value.value)
    document.getElementById("heading_text_color_hex_input").placeholder = rgbToHex(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value)
})

heading_text_color_green_slider.addEventListener("input", function() {
    document.getElementById("heading_text_color_green_slider_value").placeholder = heading_green_slider_value.value
    heading_change_text_color_preview(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value, heading_alpha_slider_value.value)
    document.getElementById("heading_text_color_hex_input").placeholder = rgbToHex(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value)
})

heading_text_color_blue_slider.addEventListener("input", function() {
    document.getElementById("heading_text_color_blue_slider_value").placeholder = heading_blue_slider_value.value
    heading_change_text_color_preview(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value, heading_alpha_slider_value.value)
    document.getElementById("heading_text_color_hex_input").placeholder = rgbToHex(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value)
})

heading_text_color_alpha_slider.addEventListener("input", function() {
    document.getElementById("heading_text_color_alpha_slider_value").placeholder = heading_alpha_slider_value.value
    heading_change_text_color_preview(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value, heading_alpha_slider_value.value)
    document.getElementById("heading_text_color_hex_input").placeholder = rgbToHex(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value)
})

heading_text_color_red_slider_value.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        heading_red_slider_value.value = heading_red_slider_value_value.value
        heading_red_slider_value_value.value = ""
        document.getElementById("heading_text_color_red_slider_value").placeholder = heading_red_slider_value.value
        heading_change_text_color_preview(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value, heading_alpha_slider_value.value)
        document.getElementById("heading_text_color_hex_input").placeholder = rgbToHex(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value)
    }
})

heading_text_color_green_slider_value.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        heading_green_slider_value.value = heading_green_slider_value_value.value
        heading_green_slider_value_value.value = ""
        document.getElementById("heading_text_color_green_slider_value").placeholder = heading_green_slider_value.value
        heading_change_text_color_preview(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value, heading_alpha_slider_value.value)
        document.getElementById("heading_text_color_hex_input").placeholder = rgbToHex(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value)
    }
})

heading_text_color_blue_slider_value.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        heading_blue_slider_value.value = heading_blue_slider_value_value.value
        heading_blue_slider_value_value.value = ""
        document.getElementById("heading_text_color_blue_slider_value").placeholder = heading_blue_slider_value.value
        heading_change_text_color_preview(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value, heading_alpha_slider_value.value)
        document.getElementById("heading_text_color_hex_input").placeholder = rgbToHex(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value)
    }
})

heading_text_color_alpha_slider_value.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        heading_alpha_slider_value.value = heading_alpha_slider_value_value.value
        heading_alpha_slider_value_value.value = ""
        document.getElementById("heading_text_color_alpha_slider_value").placeholder = heading_alpha_slider_value.value
        heading_change_text_color_preview(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value, heading_alpha_slider_value.value)
        document.getElementById("heading_text_color_hex_input").placeholder = rgbToHex(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value)
    }
})

heading_text_color_hex_input.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        let heading_rgb_values = hexToRgb(heading_hex_value.value)
        document.getElementById("heading_text_color_red_slider_value").placeholder = heading_rgb_values[0]
        document.getElementById("heading_text_color_green_slider_value").placeholder = heading_rgb_values[1]
        document.getElementById("heading_text_color_blue_slider_value").placeholder = heading_rgb_values[2]
        heading_red_slider_value.value = heading_rgb_values[0]
        heading_green_slider_value.value = heading_rgb_values[1]
        heading_blue_slider_value.value = heading_rgb_values[2]
        heading_hex_value.value = ""
        heading_change_text_color_preview(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value, heading_alpha_slider_value.value)
        document.getElementById("heading_text_color_hex_input").placeholder = rgbToHex(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value)
    }
})

heading_apply_text_color_button.addEventListener("click", function() {
    heading_change_text_color(heading_red_slider_value.value, heading_green_slider_value.value, heading_blue_slider_value.value, heading_alpha_slider_value.value)
})