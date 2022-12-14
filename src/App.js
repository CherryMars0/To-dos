const { app, BrowserWindow, nativeImage, Tray, ipcMain } = require('electron');
const path = require('path')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        resizable: false,
        icon: nativeImage.createFromPath('../assets/img/favicon.ico'),
        webPreferences: {
            preload: path.join(__dirname, './preload.js'),
            webSecurity: false,
            nodeIntegration: true,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModules: true,
        }
    })
    ipcMain.on('open-devtools', () => {
        mainWindow.openDevTools();
    });
    ipcMain.on('reload', () => {
        mainWindow.reload();
    });
    ipcMain.on('closed', () => {
        tray = null;
        app.quit();
    });
    mainWindow.loadFile("./views/index.html");
    mainWindow.setMenu(null);
}


let tray
const trayFun = (icon) => {
    tray = new Tray(icon)
    tray.setToolTip('To dos.')
    tray.setTitle('To dos.')
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });

    const icon = nativeImage.createFromPath('../assets/img/favicon.ico')
    trayFun(icon)
})



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        tray = null;
        app.quit()
    }
});