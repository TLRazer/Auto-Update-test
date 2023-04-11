const { app, BrowserWindow, Notification } = require('electron');
const path = require('path');


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