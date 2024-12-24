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
    { url: '1.jpg', keywords: ['funny', 'politician'] },
    { url: '2.jpg', keywords: ['cute', 'dog'] },
    { url: '3.jpg', keywords: ['cute', 'dog ', 'baby', 'sleep'] },
    { url: '4.jpg', keywords: ['cute', 'cat', 'sleep'] },
    { url: '5.jpg', keywords: ['baby', 'funny'] },
    { url: '6.jpg', keywords: ['funny ', 'man'] },
    { url: '7.jpg', keywords: ['funny ', 'surprised'] },
    { url: '8.jpg', keywords: ['funny', 'man'] },
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
