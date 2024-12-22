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
  gCtx.strokeStyle = gText.borderColor
  gCtx.lineWidth = gText.borderWidth
  gCtx.textAlign = 'left'
  gCtx.textBaseline = 'middle'

  var x = gElCanvas.width / 4
  var y = gElCanvas.height / 2
  const letterSpacing = 2

  gCtx.strokeText(gText.txt, x, y)
  gCtx.fillText(gText.txt, x, y)

  x = gCtx.measureText(gText.txt).width / gText.txt.length
  console.log(gText.size, letterSpacing, gText.txt)
}

function onAddTxt(inputElement) {
  const eltext = inputElement.value
  if (eltext) {
    gText.txt = eltext
  } else {
    gText.txt = ''
  }
  renderText()
  renderCanvas()
}

function onUpdateLineSize(sizeChange) {
  updateLineSize(sizeChange)
  renderText()
  renderCanvas()
}

function onSelectFont() {
  const fontSelector = document.querySelector('.font-selector')
  fontSelector.addEventListener('change', (event) => {
    const selectedFont = event.target.value
    gText.font = selectedFont
    renderText()
    renderCanvas()
  })
}

function onPickColor() {
  const elColorSelect = document.querySelector('.color-select')

  elColorSelect.addEventListener('input', (event) => {
    gText.color = event.target.value
    renderText()
    renderCanvas()
  })

  elColorSelect.click()
}

function onPickBorderColor() {
  const elBorderColorSelect = document.querySelector('.border-color-select')

  elBorderColorSelect.addEventListener('input', (event) => {
    gText.borderColor = event.target.value
    renderText()
    renderCanvas()
  })

  elBorderColorSelect.click()
}
