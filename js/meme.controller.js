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
    console.log('Image loaded successfully!')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    renderLines()
  }
}

function resizeCanvas() {
  const aspectRatio = 1 / 1
  if (window.outerWidth > 768) {
    gElCanvas.width = 500
  } else {
    gElCanvas.width = window.outerWidth - 22
  }
  gElCanvas.height = gElCanvas.width / aspectRatio
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

function OnScroll(side) {
  const scroller = document.getElementById('emojiScroller')
  scroller.scrollBy({ left: side, behavior: 'smooth' })
}

function onEmojiClick(emoji) {
  addLine(0, emoji)
  renderMeme()
}

function openShereModal() {
  const modal = document.getElementById('shareModal')
  modal.style.display = 'flex'
}

function closeShereModal() {
  const modal = document.getElementById('shareModal')
  modal.style.display = 'none'
}

function downloadImg() {
  const dataUrl = gElCanvas.toDataURL('image/png')

  const elLink = document.createElement('a')
  elLink.href = dataUrl
  elLink.download = 'meme-image.png'
  elLink.click()
  closeShereModal()
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader()
  reader.onload = function (event) {
    var img = new Image()
    img.onload = () => onImageReady(img)
    img.src = event.target.result
    gSelectedImg = img.src
  }

  closeShereModal()
  reader.readAsDataURL(ev.target.files[0])
}
function renderImg(img) {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

  renderLines()
}
