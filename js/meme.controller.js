'use strict'

var gElCanvas
var gCtx
var gSelectedImg

function initCanvas(imgUrl) {
  gSelectedImg = imgUrl
  renderCanvas()
}

function renderCanvas() {
  gElCanvas = document.querySelector('.main-canvas')
  gCtx = gElCanvas.getContext('2d')

  const img = new Image()
  img.src = gSelectedImg

  img.onload = () => {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderText()
  }
}

function renderText() {
  gCtx.font = `${gText.size}px ${gText.font}`
  gCtx.fillStyle = gText.color
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'

  let x = gElCanvas.width / 4
  let y = gElCanvas.height / 2
  for (let i = 0; i < gText.txt.length; i++) {
    gCtx.fillText(gText.txt[i], x, y)
    x += gCtx.measureText(gText.txt[i]).width + 2
  }
}

function onAddTxt(inputElement) {
  const eltext = inputElement.value
  gText = { txt: eltext, color: 'black', size: 30, font: 'Arial' }
  renderText()
  renderCanvas()
}

function onAddLine() {}

function onDeleteLine() {}

function onUpdateLineSize(sizeChange) {
  updateLineSize(sizeChange)
  renderText()
  renderCanvas()
}

function onSelectFont() {}

function onPickColor() {
  const elColorSelect = document.querySelector('.color-select')
  elColorSelect.click()
}
