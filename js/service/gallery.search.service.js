'use strict'

const categoryData = {
  funny: { popularity: 1, fontSize: 16 },
  money: { popularity: 1, fontSize: 16 },
  cute: { popularity: 1, fontSize: 16 },
  stoned: { popularity: 1, fontSize: 16 },
}

function FilterImages(searchTerm, category) {
  var filteredImgs = gImgs

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
}

function optionClick(category) {
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

function getNewFontSize(popularity) {
  let newFontSize
  if (window.innerWidth < 768) {
    newFontSize = 16 + popularity * 2
    newFontSize = Math.min(newFontSize, 30)
    newFontSize = Math.max(newFontSize, 16)
  } else {
    newFontSize = 28 + popularity * 2
    newFontSize = Math.min(newFontSize, 60)
    newFontSize = Math.max(newFontSize, 28)
  }
  return newFontSize
}

function increaseFont(category, newFontSize) {
  const categoryElement = document.querySelector(`[data-value="${category}"]`)
  if (categoryElement) {
    categoryElement.style.fontSize = `${newFontSize}px`
  }
}

function reduceOthersfont(category) {
  for (let otherCategory in categoryData) {
    if (otherCategory !== category) {
      let otherCategoryElement = document.querySelector(`[data-value="${otherCategory}"]`)
      let otherFontSize = categoryData[otherCategory].fontSize

      otherFontSize = Math.max(otherFontSize - 1, window.innerWidth < 768 ? 16 : 28)
      categoryData[otherCategory].fontSize = otherFontSize

      if (otherCategoryElement) {
        otherCategoryElement.style.fontSize = `${otherFontSize}px`
      }
    }
  }
}

function optionClick(category) {
  categoryData[category].popularity++

  const selectElement = document.querySelector('.category-select')
  if (selectElement) {
    selectElement.selectedIndex = 0
  }

  const popularity = categoryData[category].popularity
  const newFontSize = getNewFontSize(popularity)

  categoryData[category].fontSize = newFontSize
  increaseFont(category, newFontSize)

  reduceOthersfont(category)
}
