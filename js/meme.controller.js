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

function addListeners() {
  addMouseListeners()
  addTouchListeners()
  window.addEventListener('resize', () => {
    renderMeme()
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
  const pos = getEvPos(ev)

  if (isLineClicked(pos)) {
    gStartPos = pos
  }
  console.log(gMeme.selectedLineIdx)
}

function onMove(ev) {
  const pos = getEvPos(ev)

  if (gStartPos) {
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    gSelectedLine.pos.x += dx
    gSelectedLine.pos.y += dy
    gStartPos = pos
    renderMeme()
    console.log('Move ', gStartPos)
  }
}

function onUp(ev) {
  gStartPos = null

  console.log('Mouse/Touch up', gStartPos)
}

function isLineClicked(pos) {
  //const line = gSelectedLine

  const line = gMeme.lines.find((line) => {
    return (
      pos.x >= line.pos.x &&
      pos.x <= line.pos.x + gCtx.measureText(line.txt).width &&
      pos.y >= line.pos.y - line.size &&
      pos.y <= line.pos.y + line.size
    )
  })
  if (line) {
    gMeme.selectedLineIdx = gMeme.lines.indexOf(line)
    gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
    input.value = gSelectedLine.txt
    renderMeme()
    return true
  }
  return false
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

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()

    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }
  console.log('Event position:', pos)
  return pos
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
