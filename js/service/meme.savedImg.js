'use strict'

const STORAGE_KEY2 = 'savedMeme'

function loadMemeFromStorage() {
  const savedMeme = loadFromStorage(STORAGE_KEY2) || []

  if (savedMeme.length > 0) {
    const img = new Image()
    img.onload = function () {
      gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
      gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    img.src = savedMeme[0]
  } else {
    console.log('No saved meme found.')
  }
}

function saveMemeToStorage() {
  const savedMeme = gElCanvas.toDataURL('image/png')

  let memeData = loadFromStorage(STORAGE_KEY2) || []

  memeData.push(savedMeme)

  saveToStorage(STORAGE_KEY2, memeData)
  console.log('Meme saved!')
}
