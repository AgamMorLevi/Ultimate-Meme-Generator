'use strict'

var gElCanvas
var gCtx
var gSelectedImg
var gSelectedLine
var gStartPos

const input = document.querySelector('.text-input')

function initCanvas(imgUrl) {
  gSelectedImg = imgUrl
  geteEmojiScrollerWidth()
  renderMeme()
  addListeners()
}

function renderMeme() {
  gElCanvas = document.querySelector('.main-canvas')
  gCtx = gElCanvas.getContext('2d')
  gSelectedLine = getLine()
  const img = new Image()
  img.src = gSelectedImg

  img.onload = () => {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    resizeCanvas()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderLines()
    onDrewRect()
  }
}

function resizeCanvas() {
  const img = new Image()
  img.src = gSelectedImg
  if (window.outerWidth > 768) {
    gElCanvas.width = 500
  } else {
    gElCanvas.width = window.outerWidth - 22
  }

  const canvasHeight = (img.height * gElCanvas.width) / img.width
  console.log(img.height, 'gSelectedImg.height')
  gElCanvas.height = canvasHeight
}

function renderLines() {
  gMeme.lines.forEach((line) => {
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = line.textAlign
    gCtx.fillStyle = line.color
    gCtx.strokeStyle = line.borderColor
    gCtx.lineWidth = line.borderWidth

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
    selectFont(event)
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
  switchLine()
  renderMeme()
}

function OnScroll(side) {
  const scroller = document.getElementById('emojiScroller')
  scroller.scrollBy({ left: side, behavior: 'smooth' })
}

function onEmojiClick(emoji) {
  addLine(0, emoji)
  renderMeme()
}
