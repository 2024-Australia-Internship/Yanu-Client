const user_code = getCookie('user_code');
let imgUploadBtn = document.getElementsByClassName('upload-img-btn')[0];
let realImgUploadBtn = document.getElementsByClassName('upload-file')[0];
let currentImgLength = document.getElementsByClassName('current-img')[0];
let currentHashTagLength = document.getElementsByClassName('current-hashtag')[0];
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
    let images = [...document.getElementsByClassName('upload-img-li')].length;
    currentImgLength.innerText = images;
}

function deleteImg(e){
    e.parentNode.remove();
    currentImgLength.innerHTML = parseInt(currentImgLength.innerHTML)-1;
}

function chooseCategory(flag){
    if(flag){ // fruit
        document.getElementsByClassName('fruit-category')[0].src = '/images/product-upload-fruit-choose.svg';
        document.getElementsByClassName('vegetable-category')[0].src = '/images/product-upload-vegetable.svg';

        document.getElementsByClassName('fruit-category')[0].classList.add('choose-category');
        document.getElementsByClassName('vegetable-category')[0].classList.remove('choose-category');

    }else{ //vegetable
        document.getElementsByClassName('fruit-category')[0].src = '/images/product-upload-fruit.svg';
        document.getElementsByClassName('vegetable-category')[0].src = '/images/product-upload-vegetable-choose.svg';
    
        document.getElementsByClassName('fruit-category')[0].classList.remove('choose-category');
        document.getElementsByClassName('vegetable-category')[0].classList.add('choose-category');
    }
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

function uploadProduct(){
    let title = document.getElementsByClassName('product-title-input')[0].value;
    let category = document.getElementsByClassName('choose-category')[0];
    let price = document.getElementsByClassName('price-input')[0].value;
    let unit = document.getElementsByClassName('select-unit-num')[0].innerText;
    let description = document.getElementsByClassName('description-input')[0].value;
    let hashtag = JSON.stringify(tagify.value.map(hashtag => hashtag.value));

    if(title === '') return alert('title');
    if(hashtag == '[]') return alert('hashtag');
    if(price == '' || isNaN(price)) return alert('price');
    if(description == '') return alert('description');

    let categoryBoolean = 0;
    if(category == undefined){
        return alert('Please choose a category');
    }else if(category.classList.contains('fruit-category')){
        categoryBoolean = 'fruit';
    }else if(category.classList.contains('vegetable-category')){
        categoryBoolean = 'vegetable';
    }

    console.log(hashtag);

    const req = {
        title: title,
        category: categoryBoolean,
        hashtag: hashtag,
        price: price,
        unit: unit,
        description: description
    }

    axios.post(`${BASE_URL}/products`, req, config)
    .then(response => {
        console.log(response);
        sendProductImgs(response.data.product_id);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function sendProductImgs(product_code){
    console.log(user_code);
    const formData = new FormData();
    let files = document.getElementsByClassName('upload-file')[0].files;
    console.log([...files]);


    for(let file of files){
        formData.append('image', file);
    }
    formData.append('productId', product_code);

    axios.post(`${BASE_URL}/products/image`, formData, config)
    .then(response => {
        console.log(response);
        window.location.href = '/html/main-page.html';
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

// tagify
var input = document.getElementsByClassName('hashtag-input')[0];
var tagify = new Tagify(input);

tagify.on('keydown', e => onTagifyKeyDown(e))
tagify.on('add', showList);
tagify.on('remove', showList);

function onTagifyKeyDown(e){
    if(e.detail.event.keyCode == 32) {
        tagify.addTags(tagify.DOM.input.innerText);
        tagify.DOM.input.innerText = '';
    }
}

function showList(){
    if(tagify.value.length > 5){
        tagify.removeTag();
        currentHashTagLength.innerText = 5;
    }else {
        currentHashTagLength.innerText = tagify.value.length;
    }
    
}