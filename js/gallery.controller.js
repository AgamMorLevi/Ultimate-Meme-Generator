'use strict'

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
    console.log('Selected image:', selectedImage)
    console.log('Rendering Meme Editor...')
    // renderMeme(); // Call the meme editor function if implemented
  }
}
