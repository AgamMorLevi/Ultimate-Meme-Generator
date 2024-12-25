'use strict'

function openShereModal() {
  const modal = document.getElementById('shareModal')
  modal.style.display = 'flex'
}

function closeShereModal() {
  const modal = document.getElementById('shareModal')
  modal.style.display = 'none'
}

function downloadImg() {
  const dataUrl = gElCanvas.toDataURL('image/png')

  const elLink = document.createElement('a')
  elLink.href = dataUrl
  elLink.download = 'meme-image.png'
  elLink.click()
  closeShereModal()
}

function onImgInput(ev) {
  loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader()
  reader.onload = function (event) {
    var img = new Image()
    img.onload = () => onImageReady(img)
    img.src = event.target.result
    gSelectedImg = img.src
  }

  closeShereModal()
  reader.readAsDataURL(ev.target.files[0])
}
function renderImg(img) {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

  renderLines()
}
