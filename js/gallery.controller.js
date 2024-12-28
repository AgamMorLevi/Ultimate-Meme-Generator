'use strict'

var selectedImage
let selectedCategory = 'all'

function onInit() {
  _createImages()
  renderGallery(gImgs)
  renderSelectOptionSearch()
  renderSearchFilters()
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

function renderSelectOptionSearch() {
  var strHtmls = `<option hidden>select Option</option>`
  categoreis.map((category) => (strHtmls += `<option value="${category}">${category}</option>`))
  const elCategorySelect = document.querySelector('.category-select')
  elCategorySelect.innerHTML = strHtmls
}

function renderSearchFilters() {
  const strHtmls = filters.map(
    (filter) =>
      `
       <div class="category" data-value="${filter}" onclick="onCategoryClick('${filter}'); onOptionClick('${filter}')">${filter}</div>
  `
  )
  const elCategoryContainer = document.querySelector('.categories-container')
  elCategoryContainer.innerHTML += strHtmls.join('')
}

function onSelectImage(imageId) {
  const homePageContainer = document.querySelector('.home-page-container')
  const savedPageContainer = document.querySelector('.saved-page-container')
  const memeEditorContainer = document.querySelector('.meme-editor-container')

  const selectedImage = gImgs.find((img) => img.id === imageId)

  if (selectedImage) {
    resetMeme()
    homePageContainer.style.display = 'none'
    savedPageContainer.style.display = 'none'
    memeEditorContainer.style.display = window.innerWidth < 764 ? 'grid' : 'flex'

    const imgUrl = `img/meme-img/${selectedImage.url}`

    initCanvas(imgUrl)
  }
}

function onEnterSearch(event) {
  if (event.key === 'Enter') {
    event.preventDefault()
    const searchTerm = event.target.value.toLowerCase()
    OnFilterImages(searchTerm, selectedCategory)
  }
}

function onSearch() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase()
  OnFilterImages(searchTerm, selectedCategory)
}

function onCategoryClick(category) {
  selectedCategory = category
  const searchTerm = document.getElementById('search-input').value.toLowerCase()
  OnFilterImages(searchTerm, selectedCategory)
}

function OnFilterImages(searchTerm, category) {
  var filtered = filterImages(searchTerm, category)
  renderGallery(filtered)
}

function onOptionClick(category) {
  optionClick(category)
}
