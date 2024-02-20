//INCLUDE
const { app, BrowserWindow, ipcMain } = require("electron")
const ipc = ipcMain
const path = require("path")

//UTILS
function log(message) {
    var time = new Date().toLocaleTimeString()
    console.log(`[${time}] ${message}`)
}


//MAIN WINDOW
const createWindow = function() {
    const window = new BrowserWindow({
        width: 1000,
        height: 600,
        minWidth: 1000,
        minHeight: 600,
        frame: false,
        icon: "/src/assets/logo.png",
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, "src/preload.js"),
        }
    })

    log("Initializing Window")
    window.loadFile("src/index.html")

    ipcListener(window)
}

//WINDOW MANAGEMENT
app.whenReady().then(function() {
    log("Creating Window")
    createWindow() 
})

app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

app.on("window-all-closed", function() {
    if(process.platform !== "darwin") {
        app.quit()
    }
})

//LISTENER
function ipcListener(window) {
    ipc.on("minimizeApp", function() {
        if(!window.isDestroyed()) {
            window.minimize()
        }
    })
    
    ipc.on("closeApp", function() {
        if(!window.isDestroyed()) {
            window.close()
        }
    })
}