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

function chooseCategory(flag){
    if(flag){ // fruit
        document.getElementsByClassName('fruit-category')[0].src = '/images/product-upload-fruit-choose.svg';
        document.getElementsByClassName('vegetable-category')[0].src = '/images/product-upload-vegetable.svg';
    }else{ //vegetable
        document.getElementsByClassName('fruit-category')[0].src = '/images/product-upload-fruit.svg';
        document.getElementsByClassName('vegetable-category')[0].src = '/images/product-upload-vegetable-choose.svg';
    }
}

let hashtagInput = document.getElementsByClassName('hashtag-input')[0];

hashtagInput.addEventListener('keyup', function(e){
    console.log(hashtagInput.value);
    console.log(e.keyCode);
    if(e.keyCode==32){
        addHashtag(hashtagInput);
    }else if(e.keyCode==8 && hashtagInput.value == ''){
        deleteHashtag();
    }
})
function moveHashtagPadding(){
    let inputDiv = document.getElementsByClassName('hashtag-input')[0];
    let hashtagBtnDiv = document.getElementsByClassName('hashtag-btn-div')[0];
    inputDiv.style.paddingLeft = `${hashtagBtnDiv.offsetWidth + 8}px`;
}

function addHashtag(e){
    let hashtagBtnDiv = document.getElementsByClassName('hashtag-btn-div')[0];
    let hashtagBtn = document.createElement('div');

    hashtagBtn.className = 'hashtag-btn';
    hashtagBtn.innerText = `#${e.value}`
    hashtagBtnDiv.appendChild(hashtagBtn);
    e.value = '';
    console.log(hashtagBtnDiv.offsetWidth);

    moveHashtagPadding();
    
}
function deleteHashtag(){
    let hashtagBtnDiv = document.getElementsByClassName('hashtag-btn-div')[0];
    hashtagBtnDiv.lastChild.remove();

    moveHashtagPadding();
}

const label = document.querySelector('.label');
const countryNum = document.getElementsByClassName('select-unit-num')[0];
const options = document.querySelectorAll('.optionItem');
const handleSelect = function(item) {
    console.log(item.textContent)
    countryNum.innerHTML = item.textContent;
    label.parentNode.classList.remove('active');
    label.style.boxShadow = 'none';
}
options.forEach(function(option){
    option.addEventListener('click', function(){handleSelect(option)})
})

label.addEventListener('click', function(){
    if(label.parentNode.classList.contains('active')) {
        label.parentNode.classList.remove('active');
        label.style.boxShadow = 'none';
    } else {
        label.parentNode.classList.add('active');
        label.style.boxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.08)';
    }
});