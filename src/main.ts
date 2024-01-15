import { app, BrowserWindow, Menu } from 'electron'
import path from 'node:path'

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "The Game",
  })
  win.maximize()
  win.fullScreen = true
  win.loadFile(path.join(__dirname, '../public/index.html'))
  // Menu.setApplicationMenu(Menu.buildFromTemplate([]));
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})