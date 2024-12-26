'use strict'

var selectedImage
let selectedCategory = 'all'

function onInit() {
  _createImages()
  renderGallery(gImgs)
}

function renderGallery(images) {
  const strHtmls = images.map(
    (image) => `
    <div class="image-gallery-item">
            <img class="gallery-image" src="img/meme-img/${image.url}" onclick="onSelectImage('${image.id}')"/>
            </div>
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

function onEnterSearch(event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    const searchTerm = event.target.value.toLowerCase()
    filterImages(searchTerm, selectedCategory)
  }
}

function onSearch() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase()
  filterImages(searchTerm, selectedCategory)
}

function onCategoryClick(category) {
  selectedCategory = category
  const searchTerm = document.getElementById('search-input').value.toLowerCase()
  filterImages(searchTerm, selectedCategory)
}

function filterImages(searchTerm, category) {
  let filteredImgs = gImgs

  if (category !== 'all') {
    filteredImgs = filteredImgs.filter((img) =>
      img.keywords.some((keyword) => keyword.toLowerCase() === category.toLowerCase())
    )
  }

  if (searchTerm) {
    filteredImgs = filteredImgs.filter((img) =>
      img.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm))
    )
  }

  renderGallery(filteredImgs)
}
