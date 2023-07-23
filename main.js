const { app, BrowserWindow } = require('electron');

function createWindow() {
    // Create the browser window
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true, // Enable Node.js integration in the renderer process
            contentSecurityPolicy: ''
        }
    });

    // Load your app's HTML file
    mainWindow.loadFile('src/index.html');

    mainWindow.webContents.openDevTools();
}

// When Electron has finished initializing
app.whenReady().then(createWindow);

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