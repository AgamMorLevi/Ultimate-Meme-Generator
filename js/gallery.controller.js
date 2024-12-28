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
  const savedPageContainer = document.querySelector('.saved-page-container')
  const memeEditorContainer = document.querySelector('.meme-editor-container')

  const selectedImage = gImgs.find((img) => img.id === imageId)

  if (selectedImage) {
    homePageContainer.style.display = 'none'
    savedPageContainer.style.display = 'none'
    memeEditorContainer.style.display = window.innerWidth < 764 ? 'grid' : 'flex'

    const imgUrl = `img/meme-img/${selectedImage.url}`

    initCanvas(imgUrl)
  }
}

function moveToGallery() {
  const homePageContainer = document.querySelector('.home-page-container')
  const memeEditorContainer = document.querySelector('.meme-editor-container')
  const savedPageContainer = document.querySelector('.saved-page-container')

  homePageContainer.style.display = 'grid'
  memeEditorContainer.style.display = 'none'
  savedPageContainer.style.display = 'none'
}

function moveToSaved() {
  const homePageContainer = document.querySelector('.home-page-container')
  const memeEditorContainer = document.querySelector('.meme-editor-container')
  const savedPageContainer = document.querySelector('.saved-page-container')
  getSavedImage()
  homePageContainer.style.display = 'none'
  memeEditorContainer.style.display = 'none'
  savedPageContainer.style.display = 'grid'
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

const categoryData = {
  funny: { popularity: 1, fontSize: 16 },
  money: { popularity: 1, fontSize: 16 },
  cute: { popularity: 1, fontSize: 16 },
  stoned: { popularity: 1, fontSize: 16 },
}

function onOptionClick(category) {
  categoryData[category].popularity++
  const categoryElement = document.querySelector(`[data-value="${category}"]`)
  const selectElement = document.querySelector('.category-select')
  selectElement.selectedIndex = 0
  if (categoryElement) {
    let newFontSize
    const popularity = categoryData[category].popularity

    if (window.innerWidth < 768) {
      newFontSize = 16 + popularity * 2
      newFontSize = Math.min(newFontSize, 30)
      newFontSize = Math.max(newFontSize, 16)
    } else {
      newFontSize = 28 + popularity * 2
      newFontSize = Math.min(newFontSize, 60)
      newFontSize = Math.max(newFontSize, 28)
    }

    categoryData[category].fontSize = newFontSize
    categoryElement.style.fontSize = `${newFontSize}px`

    for (let otherCategory in categoryData) {
      if (otherCategory !== category) {
        let otherCategoryElement = document.querySelector(`[data-value="${otherCategory}"]`)
        let otherFontSize = categoryData[otherCategory].fontSize

        otherFontSize = Math.max(otherFontSize - 2, window.innerWidth < 768 ? 16 : 28)
        categoryData[otherCategory].fontSize = otherFontSize
        otherCategoryElement.style.fontSize = `${otherFontSize}px`
      }
    }
  }
}
