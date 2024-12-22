'use strict'
var gText = {
  txt: 'Hello World',
  size: 30,
  color: '#000000',
  font: 'Arial',
  borderColor: '#FFFFFF',
  borderWidth: 2,
}

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [], //i will add all the lines here but not now
}

function getText() {
  return gText
}

function updateLineSize(sizeChange) {
  gText.size += sizeChange

  if (gText.size < 20) gText.size = 20
  if (gText.size > 100) gText.size = 100

  return gText.size
}

function _createLine(
  txt = gText.txt,
  size = gText.size,
  color = gText.color,
  font = gText.font,
  borderColor = gText.borderColor
) {
  return {
    id: makeId(),
    txt,
    size,
    color,
    font,
    borderColor,
    borderWidth: gText.borderWidth,
    x: gElCanvas.width / 2,
    y: gElCanvas.height / 2,
  }
}
function _createLines() {}
