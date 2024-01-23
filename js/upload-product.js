const user_code = getCookie('user_code');
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

        document.getElementsByClassName('fruit-category')[0].classList.add('choose-category');
        document.getElementsByClassName('vegetable-category')[0].classList.remove('choose-category');

    }else{ //vegetable
        document.getElementsByClassName('fruit-category')[0].src = '/images/product-upload-fruit.svg';
        document.getElementsByClassName('vegetable-category')[0].src = '/images/product-upload-vegetable-choose.svg';
    
        document.getElementsByClassName('fruit-category')[0].classList.remove('choose-category');
        document.getElementsByClassName('vegetable-category')[0].classList.add('choose-category');
    }
}

let hashtagInput = document.getElementsByClassName('hashtag-input')[0];

hashtagInput.addEventListener('keyup', function(e){
    if(e.keyCode==32){
        addHashtag(hashtagInput);
    }else if(e.keyCode==8 && hashtagInput.value == ''){
        deleteHashtag();
    }
})
function moveHashtagPadding(){
    let inputDiv = document.getElementsByClassName('hashtag-input')[0];
    let hashtagBtnDiv = document.getElementsByClassName('hashtag-btn-div')[0];
    console.log(inputDiv.offsetWidth);
    console.log(hashtagBtnDiv.offsetWidth);
    if(inputDiv.offsetWidth >= hashtagBtnDiv.offsetWidth){
        inputDiv.style.paddingLeft = `${hashtagBtnDiv.offsetWidth + 8}px`;
    }else{
        inputDiv.style.paddingLeft = `${inputDiv.offsetWidth}px`;
    }
}

function addHashtag(e){
    let hashtagBtnDiv = document.getElementsByClassName('hashtag-btn-div')[0];
    let hashtagBtn = document.createElement('div');

    if(hashtagBtnDiv.children.length > 4){
        return alert('최대 5개까지 가능');
    }

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

function uploadProduct(){
    let title = document.getElementsByClassName('product-title-input')[0].value;
    let category = document.getElementsByClassName('choose-category')[0];
    let hashtag = `[${document.getElementsByClassName('hashtag-btn-div')[0].innerText.split('\n')}]`;
    let price = document.getElementsByClassName('price-input')[0].value;
    let unit = document.getElementsByClassName('select-unit-num')[0].innerText;
    let description = document.getElementsByClassName('description-input')[0].value;

    console.log(title);
    console.log(hashtag);
    console.log(typeof hashtag);
    console.log(price);
    console.log(unit);
    console.log(description);
    if(title === '') return alert('title');
    if(hashtag == '[]') return alert('hashtag');
    if(price == '' || isNaN(price)) return alert('price');
    if(description == '') return alert('description');

    let categoryBoolean = 0;
    if(category == undefined){
        return alert('카테고리 선택');
    }else if(category.classList.contains('fruit-category')){
        categoryBoolean = 0;
    }else if(category.classList.contains('vegetable-category')){
        categoryBoolean = 1;
    }

    console.log(categoryBoolean);

    const req = {
        product_title: title,
        product_category: categoryBoolean, 
        product_hashtag: hashtag, 
        product_price: price, 
        product_weight: 100, 
        product_unit: unit, 
        product_description: description
    }
    axios.post(`${BASE_URL}/products/${user_code}/create/info`, req)
    .then(response => {
        console.log(response.data.product_code);
        sendProductImgs(response.data.product_code);
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
         console.log(file);
        //formData.append('images', [...files]);
        formData.append('images', file);

     }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    console.log(formData);

    axios.post(`${BASE_URL}/products/${user_code}/create/image/${product_code}`, formData, config)
    .then(response => {
        console.log(response);
        alert('이미지 업로드 성공');
        // window.location.href = '/html/main-page.html';
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        alert('이미지 업로드 실패');
    });
}