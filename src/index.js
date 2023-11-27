const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');
const ipc = ipcMain

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + "/src/logo.png",
    frame: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  //mainWindow.webContents.openDevTools();

  ipc.on("closeApp", function() {
    if(!mainWindow.isDestroyed()) {
      mainWindow.close()
    }
  })

  ipc.on("minimizeApp", function() {
    if(!mainWindow.isDestroyed()) {
      mainWindow.minimize()
    }
  })

  globalShortcut.register("CommandOrControl+Shift+H", function() {
    if(!mainWindow.isDestroyed()) {
      if(mainWindow.isVisible()) {
        mainWindow.hide()
      } else {
        mainWindow.show()
      }
    }
  })
};
//create and quit function
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});