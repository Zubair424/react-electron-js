// Modules to control application life and create native browser window
const {app, BrowserWindow, nativeImage,Tray} = require('electron')
const path = require('path')
let tray, window

// app.dock.hide()
function createWindow () {
  // Create the browser window.
   window = new BrowserWindow({
    width: 420,
    height: 560,
    show:false,
    frame:false,
    skipTaskbar: false,
   fullscreenable:false,
    resizable:false,
    transparent:false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
window.on('closed',()=>window=null)

  window.loadURL('http://localhost:3000')

  
}

const createTray=()=>{
  const icon=path.join(__dirname,'assets/Group2.png')
  const nImage=nativeImage.createFromPath(icon)


  tray =new Tray(nImage);
  tray.on('click',(event)=>toggleWindow())
}
const toggleWindow=()=>{
  window.isVisible()? window.skipTaskbar(true): showWindow()
}
const showWindow=()=>{
const position=windowPosition()
window.setPosition(position.x,position.y)
window.show()
}
const windowPosition=()=>{
  const windowBounds=window.getBounds()
  const trayBounds=tray.getBounds()

  const x=Math.round(trayBounds.x+(trayBounds.width/2)-(windowBounds/2))
  const y=Math.round(trayBounds.y+trayBounds.height)
return {x,y}
}


app.whenReady().then(() => {
  createTray()
  createWindow()

  app.on('activate', function () {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

