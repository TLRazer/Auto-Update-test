const { app, BrowserWindow, Notification } = require('electron');
const { autoUpdater } = require("electron-updater");

//const { log } = require("electron-log");
//require('update-electron-app');

const path = require('path');
const server = 'https://github.com/TLRazer/Auto-Update-test'
const url = `${server}/update/${process.platform}/${app.getVersion()}`
let win;

Object.defineProperty(app, 'isPackaged', {
  get() {
    return true;
  }
});

const APP_PATH = app.getAppPath();

autoUpdater.updateConfigPath = path.join(APP_PATH, 'app-update.yml');    //Packaged directory
//autoUpdater.updateConfigPath = path.join(APP_PATH, 'electron-build\\win-unpacked\\resources\\app-update.yml');  //Testing directory
//autoUpdater.addAuthHeader("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");

autoUpdater.logger = require("electron-log")
autoUpdater.setFeedURL({
  provider: 'github',
  owner:'TLRazer',
  repo: 'auto-update-test'
});

/*
setInterval(() => {
  checkUpdate();
}, 30000)
*/
//autoUpdater.autoDownload = false;
//autoUpdater.autoInstallOnAppQuit = true;

const createWindow = () => {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html');
  };

  function checkUpdate(){
    showNotification("Path : "+ APP_PATH);
    win.webContents.executeJavaScript('console.log("Checking for updates : '+autoUpdater.checkForUpdates()+' ");');

    console.log("Checking for updates : ");
  }

  function showNotification (message = app.getVersion()) {
    let NOTIFICATION_TITLE = 'Installed version : '+app.getVersion();
    let NOTIFICATION_BODY = message;
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
  }

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });

    checkUpdate();
  });


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  });

  autoUpdater.on('update-available', (event, releaseNotes, releaseName) => {
    showNotification("A new version is available! Starting download.");
  })

  autoUpdater.on('update-not-available', (event, releaseNotes, releaseName) => {
    showNotification("No new version available.");
  })

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    showNotification("New release has been downloaded!");
    autoUpdater.quitAndInstall();
  })

  autoUpdater.on('error', (message) => {
    showNotification("There was a problem updating the application.");
    console.error('There was a problem updating the application');
    console.error(message);
  })