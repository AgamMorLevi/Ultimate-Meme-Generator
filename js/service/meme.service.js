'use strict'
var gText = { txt: '', color: 'black', size: 30, font: 'Arial' }
var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [],
}

function _createLine(txt = 'Hello World', color = 'black', size = 30, font = 'Arial') {
  const newLine = { txt, color, size, font }
  gMeme.lines.push(newText)
  console.log('Text created:', newLine)
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
