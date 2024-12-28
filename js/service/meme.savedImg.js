'use strict'

const STORAGE_KEY2 = 'savedMeme'

function saveMemeToStorage() {
  let memeData = loadFromStorage(STORAGE_KEY2) || []
  const savedMemeImage = gElCanvas.toDataURL()

  memeData.push(savedMemeImage)

  saveToStorage(STORAGE_KEY2, memeData)
  closeShereModal()
}

function renderSavedGallery(images) {
  const strHtmls = images.map(
    (image) => `
  <div class="image-gallery-item">
            <img class="gallery-image" src="${image}" />
            </div>          
          `
  )
  const elimageSavedGallery = document.querySelector('.image-saved-gallery')
  elimageSavedGallery.innerHTML = strHtmls.join('')
}

function getSavedImage() {
  const sevedMemes = loadFromStorage(STORAGE_KEY2)
  renderSavedGallery(sevedMemes)
}
