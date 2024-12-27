'use strict'

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Enter Funny Text',
      size: 30,
      color: '#000000',
      font: 'Arial',
      borderColor: '#FFFFFF',
      borderWidth: 5,
      textAlign: 'left',
      pos: { x: 125, y: 100 },
    },
  ],
}

function getLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function updateLineSize(sizeChange) {
  gSelectedLine.size += sizeChange
  if (gSelectedLine.size < 20) gSelectedLine.size = 20
  if (gSelectedLine.size > 100) gSelectedLine.size = 100

  return gSelectedLine.size
}

function setLineTxt(
  txt = 'Enter Funny Text',
  pos = { x: 125, y: 100 },
  size = 30,
  color = '#000000',
  font = 'Arial',
  borderColor = '#FFFFFF',
  borderWidth = 5,
  textAlign = 'left'
) {
  return {
    txt,
    pos,
    size,
    color,
    font,
    borderColor,
    textAlign,
    borderWidth,
  }
}

function addTxt(inputElement) {
  const eltext = inputElement.value
  gMeme.lines.length ? (gSelectedLine.txt = eltext) : gMeme.lines.push(setLineTxt(eltext)) && gMeme.selectedLineIdx++
}

function alignText(alignType) {
  var textWidth = gSelectedLine.txt.length
  gSelectedLine.textAlign = alignType
  gSelectedLine.pos.x =
    alignType === 'left' ? 0 : alignType === 'center' ? (gElCanvas.width - textWidth) / 2 : gElCanvas.width - textWidth
}

function addLine(count, text = 'Enter Funny Text') {
  var lineHeight = gMeme.lines.length ? gSelectedLine.pos.y + count : 100
  var lineWidth = gMeme.lines.length ? gSelectedLine.pos.x + count : 125

  lineWidth = lineWidth >= 400 ? 0 : lineWidth
  lineHeight = lineHeight >= 450 ? 50 : lineHeight
  const newLine = setLineTxt(text, { x: lineWidth, y: lineHeight })
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function deleteLine() {
  if (gMeme.lines.length > 0) {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  }
}

function selectFont(event) {
  const selectedFont = event.target.value
  gSelectedLine.font = selectedFont
}

function switchLine() {
  gMeme.selectedLineIdx > 0 ? gMeme.selectedLineIdx-- : (gMeme.selectedLineIdx = gMeme.lines.length - 1)
  gSelectedLine = gMeme.lines[gMeme.selectedLineIdx]
  input.value = gSelectedLine.txt
}
// function preventZoomOnMobile() {
//   const buttons = document.querySelectorAll('.edit-canvas-tools button')
//   buttons.forEach((button) => {
//     button.addEventListener('touchstart', (event) => {
//       event.preventDefault()
//     })
//   })
// }
