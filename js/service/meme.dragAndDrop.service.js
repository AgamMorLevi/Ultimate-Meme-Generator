'use strict'
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

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

function onDrewRect() {
  gCtx.font = `${gSelectedLine.size}px ${gSelectedLine.font}`
  gCtx.textAlign = gSelectedLine.textAlign
  const textMetrics = gCtx.measureText(gSelectedLine.txt)
  const textWidth = textMetrics.width
  const textHeight = gSelectedLine.size

  let boxX = gSelectedLine.pos.x
  if (gSelectedLine.textAlign === 'center') {
    boxX -= textWidth / 2
  } else if (gSelectedLine.textAlign === 'right') {
    boxX -= textWidth
  }

  gCtx.beginPath()
  gCtx.strokeStyle = 'black'
  gCtx.lineWidth = 2
  gCtx.rect(boxX - 5, gSelectedLine.pos.y - textHeight, textWidth + 10, textHeight + 10)
  gCtx.stroke()
}

function onDown(ev) {
  const pos = getEvPos(ev)

  if (isLineClicked(pos)) {
    gStartPos = pos
    console.log(gMeme.selectedLineIdx)
  }
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
  }
}

function onUp(ev) {
  gStartPos = null
}

function isLineClicked(pos) {
  //const line = gSelectedLine

  const line = gMeme.lines.find((line) => {
    return (
      pos.x >= line.pos.x &&
      pos.x <= line.pos.x + gCtx.measureText(line.txt).width &&
      pos.y >= line.pos.y - line.size &&
      pos.y <= line.pos.y
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

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // console.log(ev.offsetX, ev.offsetY)

  if (TOUCH_EVS.includes(ev.type)) {
    ev.preventDefault()

    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    }
  }

  return pos
}

function onChooseImgPicker() {
  document.querySelector('.hiddeninput').click()
}

function geteEmojiScrollerWidth() {
  const emojiScroller = document.querySelector('.emoji-scroller')
  emojiScroller.style.width = window.outerWidth - 128 + 'px'
}
