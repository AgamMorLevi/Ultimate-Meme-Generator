'use strict'

function onClickHumburger() {
  const nav = document.getElementById('mainNav')
  nav.classList.toggle('open')
}

function moveToGallery() {
  resetMeme()
  const homePageContainer = document.querySelector('.home-page-container')
  const memeEditorContainer = document.querySelector('.meme-editor-container')
  const savedPageContainer = document.querySelector('.saved-page-container')

  homePageContainer.style.display = 'grid'
  memeEditorContainer.style.display = 'none'
  savedPageContainer.style.display = 'none'
}

function moveToSaved() {
  resetMeme()
  const homePageContainer = document.querySelector('.home-page-container')
  const memeEditorContainer = document.querySelector('.meme-editor-container')
  const savedPageContainer = document.querySelector('.saved-page-container')
  getSavedImage()
  homePageContainer.style.display = 'none'
  memeEditorContainer.style.display = 'none'
  savedPageContainer.style.display = 'grid'
}

function moveToAbout() {
  resetMeme()
  const mainSocialInfo = document.querySelector('.main-social-info')
  moveToGallery()

  mainSocialInfo.scrollIntoView()
}
