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
      borderWidth: 2,
      textAlign: 'left',
      x: 125,
      y: 100,
    },
  ], //i will add all the lines here but not now
}

function getLineTxt() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function updateLineSize(sizeChange) {
  gSelectedLine.size += sizeChange

  if (gSelectedLine.size < 20) gSelectedLine.size = 20
  if (gSelectedLine.size > 100) gSelectedLine.size = 100

  return gSelectedLine.size
}

function _createLine(
  txt = 'Hello World',
  size = 30,
  color = '#000000',
  font = 'Arial',
  borderColor = '#FFFFFF',
  borderWidth = 2,
  textAlign = 'left',
  x = 125,
  y = 100
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

// function addLine(txt = gText.txt) {
//     const newLine = _createLine(txt)
//     gMeme.lines.push(newLine)
//     gMeme.selectedLineIdx = gMeme.lines.length - 1
//     renderText()
//     renderMeme()
//   }
function _createLines() {}
