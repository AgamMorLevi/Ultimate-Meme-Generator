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
            <img class="gallery-image" src="img/meme-img/${image.url}" onclick="onSelectImage('${image.id}')"/>
          `
  )
  const elimageGallery = document.querySelector('.image-gallery')
  elimageGallery.innerHTML = strHtmls.join('')
}

function onSelectImage(imageId) {
  const homePageContainer = document.querySelector('.home-page-container')
  const memeEditorContainer = document.querySelector('.meme-editor-container')

  const selectedImage = gImgs.find((img) => img.id === imageId)

  if (selectedImage) {
    homePageContainer.style.display = 'none'
    memeEditorContainer.style.display = window.innerWidth < 764 ? 'grid' : 'flex'

    const imgUrl = `img/meme-img/${selectedImage.url}`

    initCanvas(imgUrl)
  }
}

function moveToGallery() {
  const homePageContainer = document.querySelector('.home-page-container')
  const memeEditorContainer = document.querySelector('.meme-editor-container')

  homePageContainer.style.display = 'grid'
  memeEditorContainer.style.display = 'none'
}

function moveToAbout() {
  const mainSocialInfo = document.querySelector('.main-social-info')
  moveToGallery()

  mainSocialInfo.scrollIntoView()
}
