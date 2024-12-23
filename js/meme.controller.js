'use strict'

var gElCanvas
var gCtx
var gSelectedImg
var gSelectedLine
var gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
const input = document.querySelector('.text-input')

function initCanvas(imgUrl) {
  gSelectedImg = imgUrl
  renderMeme()
  addListeners()
  resizeCanvas()
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

function resizeCanvas() {
  const elContainer = document.querySelector('.canvas-container')
  gElCanvas.width = elContainer.offsetWidth
  gElCanvas.height = elContainer.offsetHeight
}

function renderLines() {
  gMeme.lines.forEach((line) => {
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = line.borderColor
    gCtx.lineWidth = line.borderWidth
    gCtx.textAlign = line.textAlign

    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
  })
}

function onAddTxt(inputElement) {
  if (gMeme.lines.length) {
    addTxt(inputElement)
  } else {
    addLine(0, inputElement.value)
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
  input.value = ''
  renderMeme()
}

function onDeleteLine() {
  deleteLine()
  if (gMeme.lines.length) {
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
    input.value = gSelectedLine.txt
  } else {
    input.value = ''
  }

  renderMeme()
}

function onSwitchLine() {
  gMeme.selectedLineIdx > 0 ? gMeme.selectedLineIdx-- : (gMeme.selectedLineIdx = gMeme.lines.length - 1)
  gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
  input.value = gSelectedLine.txt
  renderMeme()
}
