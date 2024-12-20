'use strict'
const homePageContainer = document.querySelector('.home-page-container')
const memeEditorContainer = document.querySelector('.meme-editor-container')

var selectedImage

function onInit() {
  _createImages()
  renderGallery()
}

function renderGallery() {
  const images = getMeme()
  const strHtmls = images.map(
    (image) => `
            <img class="gallery-image" src="img/meme-imgs (square)/${image.url}" onclick="onSelectImage('${image.id}')"/>
          `
  )

  const elimageGallery = document.querySelector('.image-gallery')
  elimageGallery.innerHTML = strHtmls.join('')
}

function onSelectImage(imageId) {
  selectedImage = gImgs.find((img) => img.id === imageId)
  if (selectedImage) {
    homePageContainer.style.display = 'none'
    memeEditorContainer.style.display = 'grid'
    console.log('Selected image:', selectedImage)
    console.log('Rendering Meme Editor...')
    // renderMeme(imageId)
  }
}
