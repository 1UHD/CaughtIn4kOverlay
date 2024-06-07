const { ipcRenderer } = require("electron")
const ipc = ipcRenderer
const { get_player_stats } = require("./stats.js")
const { writeConfigFile, readConfigFile } = require("./file_manager.js")

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

//TITLEBAR

//SEARCH PLAYER

search_player.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        get_player_stats(document.getElementById("search_player").value)
        .then(result => {
            add_row(result)
            document.getElementById("search_player").value = ""
        })
        .catch(error => {
            add_row(0, 0, 0, 0, 0, 0, 0, 0)
        })
    }
})

//CLOSE/MINIMIZE BUTTONS
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
            menu_buttons[i].style.background = "var(--titlebar-color)"
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
                menu_buttons[j].style.background = "var(--titlebar-color)"
            }
            menus[i].style.left = "250px"
            menu_buttons[i].style.background = "var(--options-color)"
        }
    })
}

//SIDEBAR OPTIONS MENUS

//PROFILE

//APIKEY CHANGER
apikey_input.placeholder = readConfigFile(1)

apikey_input.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        writeConfigFile(1, apikey_input.value)
        apikey_input.placeholder = apikey_input.value
        apikey_input.value = ""
    }
})

//APPEARANCE

//FONT FAMILY CHANGER

const font_dropdown = document.getElementById("font_family_dropdown");

font_dropdown.addEventListener("change", () => {
    let selected = font_dropdown.value;

    document.documentElement.style.setProperty("--active-font", '"' + selected + '", sans-serif');
})

//FONT COLOR CHANGER

const text_color_picker = document.getElementById("text_color_picker");
const heading_text_color_picker = document.getElementById("heading_text_color_picker");

text_color_picker.addEventListener("input", () => {
    document.documentElement.style.setProperty("--text-color", text_color_picker.value);
})

heading_text_color_picker.addEventListener("input", () => {
    document.documentElement.style.setProperty("--heading-color", heading_text_color_picker.value);
})

//BACKGROUND COLOR CHANGER

const background_alpha = document.getElementById("background_alpha_slider");
const background_alpha_counter = document.getElementById("background_alpha_number");
let r = 53;
let g = 53;
let b = 53;

background_alpha.addEventListener("input", () => {
    document.documentElement.style.setProperty("--body-color", `rgba(${r}, ${g}, ${b}, ${background_alpha.value / 100})`);
    background_alpha_counter.innerHTML = background_alpha.value + "%";
})

const background_color_picker = document.getElementById("background_color_picker");
const titlebar_color_picker = document.getElementById("titlebar_color_picker");
const settings_bar_color_picker = document.getElementById("settings_bar_color_picker");
const settings_menu_color_picker = document.getElementById("settings_menu_color_picker");

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    let bigint;
    let r, g, b;
  
    if (hex.length === 3) {
      r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
      g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
      b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
    } else {
      bigint = parseInt(hex, 16);
      r = (bigint >> 16) & 255;
      g = (bigint >> 8) & 255;
      b = bigint & 255;
    }
  
    return [r, g, b];
  }

background_color_picker.addEventListener("input", () => {
    rgb = hexToRgb(background_color_picker.value);
    r = rgb[0];
    g = rgb[1];
    b = rgb[2];
    document.documentElement.style.setProperty("--body-color", `rgba(${r}, ${g}, ${b}, ${background_alpha.value / 100})`);
})

titlebar_color_picker.addEventListener("input", () => {
    document.documentElement.style.setProperty("--titlebar-color", titlebar_color_picker.value);
})

settings_bar_color_picker.addEventListener("input", () => {
    document.documentElement.style.setProperty("--menu-color", settings_bar_color_picker.value);
})

settings_menu_color_picker.addEventListener("input", () => {
    document.documentElement.style.setProperty("--options-color", settings_menu_color_picker.value);
})