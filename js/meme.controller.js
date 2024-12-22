'use strict'

var gElCanvas
var gCtx
var gSelectedImg
var gSelectedLine

function initCanvas(imgUrl) {
  gSelectedImg = imgUrl
  gSelectedLine = getLineTxt()
  renderMeme()
}

function renderMeme() {
  gElCanvas = document.querySelector('.main-canvas')
  gCtx = gElCanvas.getContext('2d')

  const img = new Image()
  img.src = gSelectedImg

  img.onload = () => {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderLine()
  }
}

function renderLine() {
  gCtx.font = `${gSelectedLine.size}px ${gSelectedLine.font}`
  gCtx.fillStyle = gSelectedLine.color
  gCtx.strokeStyle = gSelectedLine.borderColor
  gCtx.lineWidth = gSelectedLine.borderWidth
  gCtx.textAlign = gSelectedLine.textAlign

  gCtx.strokeText(gSelectedLine.txt, gSelectedLine.x, gSelectedLine.y)
  gCtx.fillText(gSelectedLine.txt, gSelectedLine.x, gSelectedLine.y)
}

function onAddTxt(inputElement) {
  const eltext = inputElement.value
  if (eltext) {
    gSelectedLine.txt = eltext
  } else {
    gSelectedLine.txt = ''
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
    gSelectedLine.font = selectedFont
    renderMeme()
  })
}

function onPickColor() {
  const elColorSelect = document.querySelector('.color-select')

  elColorSelect.addEventListener('input', (event) => {
    gSelectedLine.color = event.target.value
    renderMeme()
  })

  elColorSelect.click()
}

function onPickBorderColor() {
  const elBorderColorSelect = document.querySelector('.border-color-select')

  elBorderColorSelect.addEventListener('input', (event) => {
    gSelectedLine.borderColor = event.target.value
    renderMeme()
  })

  elBorderColorSelect.click()
}

function onAlignText(alignType) {
  var textWidth = gSelectedLine.txt.length
  gSelectedLine.textAlign = alignType
  if (alignType === 'left') {
    gSelectedLine.x = 0
  } else if (alignType === 'center') {
    gSelectedLine.x = (gElCanvas.width - textWidth) / 2
  } else if (alignType === 'right') {
    gSelectedLine.x = gElCanvas.width - textWidth
  }
  renderMeme()
}
