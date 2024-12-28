'use strict'

var gImgs = []
const STORAGE_KEY = 'memeImages'

function getMeme() {
  return gImgs
}
function resetMeme() {
  const elInputText = document.querySelector('.text-input')
  elInputText.value = ''
  gMeme = {
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
}

function _createImg(image) {
  return { id: makeId(), url: image.url, keywords: image.keywords }
}

function _createImages() {
  gImgs = loadFromStorage(STORAGE_KEY)
  if (gImgs && gImgs.length > 0) return

  const images = [
    { url: '1.jpg', keywords: ['house'] },
    { url: '2.jpg', keywords: ['happy', 'everyone'] },
    { url: '3.jpg', keywords: ['spongebob', 'funny'] },
    { url: '4.jpg', keywords: ['everyone', 'scared'] },
    { url: '5.jpg', keywords: ['spongebob', 'patrick', 'money'] },
    { url: '6.jpg', keywords: ['spongebob', 'funny'] },
    { url: '7.jpg', keywords: ['spongebob', 'cute'] },
    { url: '8.jpg', keywords: ['happy', 'everyone'] },
    { url: '9.jpg', keywords: ['spongebob', 'funny'] },
    { url: '10.jpg', keywords: ['spongebob', 'cute'] },
    { url: '11.jpg', keywords: ['spongebob'] },
    { url: '12.jpg', keywords: ['money', 'mr.Crabbe'] },
    { url: '13.jpg', keywords: ['mr.Crabbe', 'funny', 'hamburger'] },
    { url: '14.jpg', keywords: ['everyone', 'cute'] },
    { url: '15.jpg', keywords: ['Squidward', 'angry'] },
    { url: '16.jpg', keywords: ['spongebob', 'funny', 'buttock'] },
    { url: '17.jpg', keywords: ['spongebob', 'funny'] },
    { url: '18.jpg', keywords: ['spongebob', 'cute', 'romantic'] },
    { url: '19.jpg', keywords: ['spongebob', 'patrick', 'cute'] },
    { url: '20.jpg', keywords: ['spongebob', 'patrick', 'hamburger'] },
    { url: '21.jpg', keywords: ['spongebob', 'angry', 'sad'] },
    { url: '22.jpg', keywords: ['plankton', 'sad'] },
    { url: '23.jpg', keywords: ['mr.Crabbe', 'money'] },
    { url: '24.jpg', keywords: ['money', 'mr.Crabbe'] },
    { url: '25.jpg', keywords: ['spongebob', 'house'] },
    { url: '26.jpg', keywords: ['Squidward', 'funny', 'buttock'] },
    { url: '27.jpg', keywords: ['spongebob', 'funny'] },
    { url: '28.jpg', keywords: ['spongebob', 'sad'] },
    { url: '29.jpg', keywords: ['stoned', 'everyone'] },
    { url: '30.jpg', keywords: ['spongebob', 'scared'] },
    { url: '31.jpg', keywords: ['plankton', 'romantic'] },
    { url: '32.jpg', keywords: ['funny', 'patrick', 'buttock'] },
    { url: '33.jpg', keywords: ['spongebob', 'stoned'] },
    { url: '34.jpg', keywords: ['funny', 'patrick'] },
    { url: '35.jpg', keywords: ['Squidward', 'funny'] },
  ]

  gImgs = images.map((image) => _createImg(image))
  _saveImages()
}

function _saveImages() {
  saveToStorage(STORAGE_KEY, gImgs)
}
