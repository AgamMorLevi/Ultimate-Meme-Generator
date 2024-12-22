'use strict'

var gElCanvas
var gCtx
var gSelectedImg
var gSelectedLine

function initCanvas(imgUrl) {
  gSelectedImg = imgUrl

  renderMeme()
}

function renderMeme() {
  gElCanvas = document.querySelector('.main-canvas')
  gCtx = gElCanvas.getContext('2d')
  gSelectedLine = getLine()
  const img = new Image()
  img.src = gSelectedImg

  img.onload = () => {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderLines()
  }
}
function renderLines() {
  gMeme.lines.forEach((line) => {
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = line.borderColor
    gCtx.lineWidth = line.borderWidth
    gCtx.textAlign = line.textAlign

    gCtx.strokeText(line.txt, line.x, line.y)
    gCtx.fillText(line.txt, line.x, line.y)
  })
}

function onAddTxt(inputElement) {
  addTxt(inputElement)
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

function onPickColor(type) {
  const elColorSelect = document.querySelector(type === 'border' ? '.border-color-select' : '.color-select')

  elColorSelect.addEventListener('input', (event) => {
    if (type === 'border') {
      gSelectedLine.borderColor = event.target.value
    } else {
      gSelectedLine.color = event.target.value
    }
    renderMeme()
  })

  elColorSelect.click()
}

function onAlignText(alignType) {
  alignText(alignType)
  renderMeme()
}

function onAddLine(count) {
  addLine(count)
  renderMeme()
}

function onDeleteLine() {
  deleteLine()
  renderMeme()
}

function onSwitchLine() {
  //  gSelectedLine = gMeme.lines[gMeme.selectedLineIdx--]
}
