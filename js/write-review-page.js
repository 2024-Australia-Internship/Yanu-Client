let starArr = [...document.getElementsByClassName('star')];

starArr.forEach((value, index) => {
    value.addEventListener('click', () => starRating(index));
});

function starRating(index){
    for(let star of starArr){
        star.classList.remove('fill-star');
    }
    for(let i=0; i<=index; i++){
        starArr[i].classList.add('fill-star');
    }
}

let imgUploadBtn = document.getElementsByClassName('upload-img-btn')[0];
let realImgUploadBtn = document.getElementsByClassName('upload-file')[0];
realImgUploadBtn.addEventListener('change', getImageFiles);

imgUploadBtn.addEventListener('click', () => realImgUploadBtn.click());

function getImageFiles(e) {
    let images = [...document.getElementsByClassName('upload-img-li')].length;
    const files = e.currentTarget.files;
  
    if ([...files].length >= 6 && [...files].length + images >= 6) {
      alert('이미지는 최대 5개까지 업로드가 가능합니다.');
      return;
    }

    [...files].forEach(file => {
        if (!file.type.match("image/.*")) {
          alert('이미지 파일만 업로드가 가능합니다.');
          return;
        }
        if ([...files].length < 6 && [...files].length + images < 6) {
            const reader = new FileReader();
            reader.onload = (e) => {
              createElement(e, file);
            };
            reader.readAsDataURL(file);
        }
    })

}

function createElement(e, file){
    let uploadImgDiv = document.getElementsByClassName('upload-img-div')[0];
    
    let uploadImgLi = document.createElement('div');
    uploadImgLi.classList.add('upload-img');
    uploadImgLi.classList.add('upload-img-li');
    uploadImgLi.innerHTML += `<iconify-icon icon="mynaui:x" class="delete-img" onclick="deleteImg(this)"></iconify-icon>`
    uploadImgLi.style.backgroundImage = `url(${e.target.result})`

    uploadImgDiv.appendChild(uploadImgLi);
}

function deleteImg(e){
    e.parentNode.remove();
}