'use strict'

function onInit() {
  renderImage()
}

function renderImage() {
  const images = getImg()
  const strHtmls = images.map(
    (image) => `
          <img class="search" src="img/meme-imgs (square)/${image}" />
        `
  )

  const elimageGallery = document.querySelector('.image-gallery')
  elimageGallery.innerHTML = strHtmls.join('')
}
