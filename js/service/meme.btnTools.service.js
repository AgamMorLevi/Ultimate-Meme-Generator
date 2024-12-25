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
  txt = 'Hello World',
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

function addLine(count, text = 'Hello World') {
  var lineHeight = gMeme.lines.length ? gSelectedLine.pos.y + count : 100
  var lineWidth = gMeme.lines.length ? gSelectedLine.pos.x + count : 125

  lineWidth = lineWidth >= 400 ? 0 : lineWidth
  lineHeight = lineHeight >= 450 ? 50 : lineHeight
  const newLine = setLineTxt(text, { x: lineWidth, y: lineHeight })
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
  console.log(gMeme.selectedLineIdx)
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
