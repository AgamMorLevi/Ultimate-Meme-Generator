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

function getText() {
  return gMeme.lines[0]
}

function updateLineSize(sizeChange) {
  gMeme.lines[0].size += sizeChange

  if (gMeme.lines[0].size < 20) gMeme.lines[0].size = 20
  if (gMeme.lines[0].size > 100) gMeme.lines[0].size = 100

  return gMeme.lines[0].size
}

function _createLine(
  txt = gMeme.lines[0].txt,
  size = gMeme.lines[0].size,
  color = gMeme.lines[0].color,
  font = gMeme.lines[0].font,
  borderColor = gMeme.lines[0].borderColor,
  textAlign = gMeme.lines[0].textAlign
) {
  return {
    id: makeId(),
    txt,
    size,
    color,
    font,
    borderColor,
    textAlign,
    borderWidth: gMeme.lines[0].borderWidth,
    x: gElCanvas.width / 2,
    y: gElCanvas.height / 2,
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
