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
    renderMeme()
  }

  closeShereModal()
  reader.readAsDataURL(ev.target.files[0])
}
function renderImg(img) {
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

  renderLines()
}

function onUploadImg(ev) {
  ev.preventDefault()
  const canvasData = gElCanvas.toDataURL('image/jpeg')

  // After a succesful upload, allow the user to share on Facebook
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
    document.querySelector('.share-option').innerHTML = `
        <button class="btn-facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}')">
           Share on Facebook  
        </button>`
  }
  uploadImg(canvasData, onSuccess)
}

async function uploadImg(imgData, onSuccess) {
  const CLOUD_NAME = 'webify'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const formData = new FormData()
  formData.append('file', imgData)
  formData.append('upload_preset', 'webify')
  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    console.log('Cloudinary response:', data)
    onSuccess(data.secure_url)
  } catch (err) {
    console.log(err)
  }
}
