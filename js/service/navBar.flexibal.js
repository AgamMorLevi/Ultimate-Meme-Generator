'use strict'

const funnySentences = [
  'Why am I like this?',
  'A picture needs a smile',

  'Where`s my motivation?',
  'Nap king',
  'Procrastination is art',
  'Sunday again?',
  'Mood: 0% energy',
  'Effort? Nah',
  'Brain off, snack on',
  'Nap, snack, repeat',
  'Food > everything',
  'Always happy in photos',
  "Smile, you're on camera",
]

function rendomeMeme() {
  const randomIndex = Math.floor(Math.random() * funnySentences.length)
  const randomLine = funnySentences[randomIndex]
  const randomImageIndex = getRandomInt(0, gImgs.length)
  const randomImage = gImgs[randomImageIndex]

  return { randomLine, randomImage }
}

function OnCreateRendomMeme() {
  resetMeme()
  const memeEditorContainer = document.querySelector('.meme-editor-container')
  const homePageContainer = document.querySelector('.home-page-container')

  const { randomLine, randomImage } = rendomeMeme()

  homePageContainer.style.display = 'none'
  memeEditorContainer.style.display = window.innerWidth < 764 ? 'grid' : 'flex'

  const randomImageUrl = `img/meme-img/${randomImage.url}`
  gMeme.lines[0].txt = randomLine
  gMeme.lines[0].pos = { x: 0, y: 50 }
  initCanvas(randomImageUrl)
}
