'use strict'

var gImgs = []
const STORAGE_KEY = 'memeImages'

function getMeme() {
  return gImgs
}

function _createImg(image) {
  return { id: makeId(), url: image.url, keywords: image.keywords }
}

function _createImages() {
  gImgs = loadFromStorage(STORAGE_KEY)
  if (gImgs && gImgs.length > 0) return

  const images = [
    { url: '2.jpg', keywords: ['', ''] },
    { url: '4.jpg', keywords: ['', ''] },
    { url: '5.jpg', keywords: ['', ''] },
    { url: '6.jpg', keywords: ['', ''] },
    { url: '7.jpg', keywords: ['', ''] },
    { url: '9.jpg', keywords: ['', ''] },
    { url: '10.jpg', keywords: ['', ''] },
    { url: '11.jpg', keywords: ['', ''] },
    { url: '12.jpg', keywords: ['', ''] },
    { url: '13.jpg', keywords: ['', ''] },
    { url: '14.jpg', keywords: ['', ''] },
    { url: '15.jpg', keywords: ['', ''] },
    { url: '16.jpg', keywords: ['', ''] },
    { url: '17.jpg', keywords: ['', ''] },
    { url: '18.jpg', keywords: ['', ''] },
    { url: '19.jpg', keywords: ['', ''] },
    { url: '20.jpg', keywords: ['', ''] },
    { url: '21.jpg', keywords: ['', ''] },
    { url: '22.jpg', keywords: ['', ''] },
    { url: '23.jpg', keywords: ['', ''] },
    { url: '24.jpg', keywords: ['', ''] },
    { url: '25.jpg', keywords: ['', ''] },
    { url: '26.jpg', keywords: ['', ''] },
    { url: '27.jpg', keywords: ['', ''] },
    { url: '28.jpg', keywords: ['', ''] },
    { url: '29.jpg', keywords: ['', ''] },
    { url: '30.jpg', keywords: ['', ''] },
    { url: '31.jpg', keywords: ['', ''] },
    { url: '32.jpg', keywords: ['', ''] },
    { url: '33.jpg', keywords: ['', ''] },
    { url: '34.jpg', keywords: ['', ''] },
    { url: '35.jpg', keywords: ['', ''] },
  ]

  gImgs = images.map((image) => _createImg(image))
  _saveImages()
}

function _saveImages() {
  saveToStorage(STORAGE_KEY, gImgs)
}
function onClickHumburger() {
  const nav = document.getElementById('mainNav')
  nav.classList.toggle('open')
}
