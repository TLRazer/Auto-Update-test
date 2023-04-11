const { app, BrowserWindow, Notification, autoUpdater } = require('electron');
const path = require('path');
const server = 'https://github.com/TLRazer/Auto-Update-test'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })

setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadFile('index.html')
  };

  const NOTIFICATION_TITLE = 'Auto update version : ';
  const NOTIFICATION_BODY = app.getVersion();

  function showNotification () {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
  }

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });

  }).then(showNotification);


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  });

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail:
        'A new version has been downloaded. Restart the application to apply the updates.',
    }
  
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  })

  autoUpdater.on('error', (message) => {
    console.error('There was a problem updating the application')
    console.error(message)
  })