'use strict'

var gElCanvas
var gCtx
var gSelectedImg

function initCanvas(imgUrl) {
  gSelectedImg = imgUrl
  renderMeme()
}

function renderMeme() {
  gElCanvas = document.querySelector('.main-canvas')
  gCtx = gElCanvas.getContext('2d')

  const img = new Image()
  img.src = gSelectedImg

  img.onload = () => {
    console.log('im herreee')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderLine()
  }
}

function renderLine() {
  gCtx.font = `${gMeme.lines[0].size}px ${gMeme.lines[0].font}`
  gCtx.fillStyle = gMeme.lines[0].color
  gCtx.strokeStyle = gMeme.lines[0].borderColor
  gCtx.lineWidth = gMeme.lines[0].borderWidth
  gCtx.textAlign = gMeme.lines[0].textAlign

  gCtx.strokeText(gMeme.lines[0].txt, gMeme.lines[0].x, gMeme.lines[0].y)
  gCtx.fillText(gMeme.lines[0].txt, gMeme.lines[0].x, gMeme.lines[0].y)
}

function onAddTxt(inputElement) {
  const eltext = inputElement.value
  if (eltext) {
    gMeme.lines[0].txt = eltext
  } else {
    gMeme.lines[0].txt = ''
  }
  renderMeme()
}

function onUpdateLineSize(sizeChange) {
  updateLineSize(sizeChange)
  renderMeme()
}

function onSelectFont() {
  const fontSelector = document.querySelector('.font-selector')
  fontSelector.addEventListener('change', (event) => {
    const selectedFont = event.target.value
    gMeme.lines[0].font = selectedFont
    renderMeme()
  })
}

function onPickColor() {
  const elColorSelect = document.querySelector('.color-select')

  elColorSelect.addEventListener('input', (event) => {
    gMeme.lines[0].color = event.target.value
    renderMeme()
  })

  elColorSelect.click()
}

function onPickBorderColor() {
  const elBorderColorSelect = document.querySelector('.border-color-select')

  elBorderColorSelect.addEventListener('input', (event) => {
    gMeme.lines[0].borderColor = event.target.value
    renderMeme()
  })

  elBorderColorSelect.click()
}

function onAlignText(alignType) {
  var textWidth = gMeme.lines[0].txt.length
  gMeme.lines[0].textAlign = alignType
  if (alignType === 'left') {
    gMeme.lines[0].x = 0
  } else if (alignType === 'center') {
    gMeme.lines[0].x = (gElCanvas.width - textWidth) / 2
  } else if (alignType === 'right') {
    gMeme.lines[0].x = gElCanvas.width - textWidth
  }
  renderMeme()
}
