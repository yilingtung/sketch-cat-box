import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import UI from 'sketch/ui'
import sketch from 'sketch'

const webviewIdentifier = 'HuLanNi.webview'

export default function () {
  const options = {
	identifier: webviewIdentifier,
	resizable: false,
	title: 'Copy Pro',
	alwaysOnTop: true,
	fullscreenable: false,
	width: 400,
	height: 420,
	show: false
  }

  const browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('Ni hao 🤘🏻')
  })

  // add a handler for a call from web content's javascript
  webContents.on('changeText', s => {
	const document = sketch.getSelectedDocument()
	const textLayer = document.selectedLayers.layers[0]
	textLayer.text = s
	
    webContents
      .executeJavaScript(`setRandomNumber(${Math.random()})`)
      .catch(console.error)
  })

  browserWindow.loadURL(require('../resources/webview.html'))
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier)
  if (existingWebview) {
    existingWebview.close()
  }
}
