'use strict'

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Hello World',
      size: 30,
      color: '#000000',
      font: 'Arial',
      borderColor: '#FFFFFF',
      borderWidth: 5,
      textAlign: 'left',
      x: 125,
      y: 100,
    },
  ],
}

function getLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function updateLineSize(sizeChange) {
  gSelectedLine.size += sizeChange
  gSelectedLine.borderWidth += sizeChange / 4
  if (gSelectedLine.size < 20) gSelectedLine.size = 20
  if (gSelectedLine.size > 100) gSelectedLine.size = 100

  return gSelectedLine.size
}

function setLineTxt(
  txt = 'Hello World',
  y = 100,
  x = 125,
  size = 30,
  color = '#000000',
  font = 'Arial',
  borderColor = '#FFFFFF',
  borderWidth = 5,
  textAlign = 'left'
) {
  return {
    txt,
    size,
    color,
    font,
    borderColor,
    textAlign,
    borderWidth,
    x,
    y,
  }
}

function addTxt(inputElement) {
  const eltext = inputElement.value
  gMeme.lines.length ? (gSelectedLine.txt = eltext) : gMeme.lines.push(setLineTxt(eltext)) && gMeme.selectedLineIdx++
}

function alignText(alignType) {
  var textWidth = gSelectedLine.txt.length
  gSelectedLine.textAlign = alignType
  gSelectedLine.x =
    alignType === 'left' ? 0 : alignType === 'center' ? (gElCanvas.width - textWidth) / 2 : gElCanvas.width - textWidth
}

function addLine(count) {
  var lineHight = gMeme.lines.length ? gSelectedLine.y + count : 100
  var lineWidth = gMeme.lines.length ? gSelectedLine.x + count : 125

  lineWidth = lineWidth >= 400 ? 0 : lineWidth
  lineHight = lineHight >= 450 ? 50 : lineHight
  const newLine = setLineTxt('Hello World', lineHight, lineWidth)
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx++
}

function deleteLine() {
  if (gMeme.lines.length > 0) {
    gMeme.lines.splice(-1)
    gMeme.selectedLineIdx--
  }
}
