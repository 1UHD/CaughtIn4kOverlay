const { ipcRenderer } = require("electron")
const ipc = ipcRenderer

buttonclose.addEventListener("click", function() {
    ipc.send("closeApp")
})

buttonminimize.addEventListener("click", function() {
    ipc.send("minimizeApp")
})