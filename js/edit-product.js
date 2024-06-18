const urlParams = new URL(location.href).searchParams;
const productId = urlParams.get('id');
const farmId = urlParams.get('farmId');

const currentImgLength = document.getElementsByClassName('current-img')[0];
const imgUploadBtn = document.getElementsByClassName('upload-img-btn')[0];
const realImgUploadBtn = document.getElementsByClassName('upload-file')[0];
const titleInput = document.getElementsByClassName('product-title-input')[0];
const fruitCategory = document.getElementsByClassName('fruit-category')[0];
const vegetableCategory = document.getElementsByClassName('vegetable-category')[0];

const tagInput = document.getElementsByClassName('hashtag-input')[0];
const tagify = new Tagify(tagInput);
const currentHashTagLength = document.getElementsByClassName('current-hashtag')[0];

const priceInput = document.getElementsByClassName('price-input')[0]
const label = document.querySelector('.label');
const countryNum = document.getElementsByClassName('select-unit-num')[0];
const options = document.querySelectorAll('.optionItem');
const descriptionInput = document.getElementsByClassName('description-input')[0];

realImgUploadBtn.addEventListener('change', getImageFiles);
imgUploadBtn.addEventListener('click', () => realImgUploadBtn.click());

let prevImage = [];

window.onload = () => {
    getProductInfo();
}

function getProductInfo() {
    axios.get(`${BASE_URL}/products/product/${productId}`, config)
    .then(response => {
        showProductInfo(response.data);
    })
    .catch(error => {
        console.error(error);
    })
}

// 이미지 업로드
function getImageFiles(e) {
    let images = [...document.getElementsByClassName('upload-img-li')].length;
    const files = e.currentTarget.files;
  
    if ([...files].length >= 6 || [...files].length + images >= 6) {
      alert('Up to 5 images can be uploaded.');
      return;
    }

    [...files].forEach(file => {
        if (!file.type.match("image/.*")) {
          alert('Only image files can be uploaded.');
          return;
        }
        if ([...files].length < 6 && [...files].length + images < 6) {
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log(e);
                createElement(e.target.result, false);
            };
            reader.readAsDataURL(file);
        }
    })
}

function deleteImg(e){
    e.parentNode.remove();
    currentImgLength.innerHTML = parseInt(currentImgLength.innerHTML)-1;
}

function createElement(image, isPrev){
    let uploadImgDiv = document.getElementsByClassName('upload-img-div')[0];
    
    let uploadImgLi = document.createElement('div');
    uploadImgLi.classList.add('upload-img');
    uploadImgLi.classList.add('upload-img-li');
    uploadImgLi.innerHTML += `<iconify-icon icon="mynaui:x" class="delete-img" onclick="deleteImg(this)"></iconify-icon>`
    
    let newimage = document.createElement('img');
    newimage.className = 'image';
    if(isPrev){
        newimage.src = `${IMAGE_URL}${image}`;
    }else{
        newimage.src = image
    }
    newimage.url = image;

    uploadImgLi.appendChild(newimage);

    uploadImgDiv.appendChild(uploadImgLi);
    let images = [...document.getElementsByClassName('upload-img-li')].length;
    currentImgLength.innerText = images;
}

// 드롭다운
const handleSelect = function(item) {
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


function chooseCategory(flag){
    // const fruit
    if(flag){ // fruit
        fruitCategory.src = '/images/product-upload-fruit-choose.svg';
        vegetableCategory.src = '/images/product-upload-vegetable.svg';

        fruitCategory.classList.add('choose-category');
        vegetableCategory.classList.remove('choose-category');

    }else{ //vegetable
        fruitCategory.src = '/images/product-upload-fruit.svg';
        vegetableCategory.src = '/images/product-upload-vegetable-choose.svg';
    
        fruitCategory.classList.remove('choose-category');
        vegetableCategory.classList.add('choose-category');
    }
}

function showProductInfo(data){
    console.log(data);
    const { title, category, hashtag, price, unit, description, images } = data;
    let option = document.getElementsByClassName(`option-${unit}`)[0];
    
    titleInput.value = title; // 타이틀 값 넣기
    chooseCategory(category === 'fruit') // 카테고리 선택하기
    tagify.addTags(JSON.parse(hashtag)); // 해시태그 값 넣기
    priceInput.value = price; // 가격 넣기
    handleSelect(option); // 단위 선택하기
    descriptionInput.value = description; // 상품 설명 값 넣기

    prevImage = [...images];
    images.forEach(image =>{
        createElement(image, true)
    })
}

async function editProduct() {
    let files = document.getElementsByClassName('upload-file')[0].files;
    let title = titleInput.value;
    let category = document.getElementsByClassName('choose-category')[0];
    let price = priceInput.value;
    let unit = countryNum.innerText;
    let description = descriptionInput.value;
    let hashtag = JSON.stringify(tagify.value.map(hashtag => hashtag.value));
    let removeImage = [...prevImage];
    let images = [...document.getElementsByClassName('image')];

    if(title === '') return alert('Please enter the title');
    if(hashtag == '[]') return alert('Please enter a hashtag');
    if(price == '' || isNaN(price)) return alert('Please enter price');
    if(description == '') return alert('Please enter the description');

    let categoryBoolean = 0;
    if(category == undefined){
        return alert('Please choose a category');
    }else if(category.classList.contains('fruit-category')){
        categoryBoolean = 'fruit';
    }else if(category.classList.contains('vegetable-category')){
        categoryBoolean = 'vegetable';
    }

    if(files.length === 0){

    }

    let formData = new FormData();

    // 지운 사진 조회
    images.forEach(image => {
        if(removeImage.includes(image.url)){
            removeImage.splice(removeImage.indexOf(image.url), 1);
        } 
    })
    formData.append('removeImage', removeImage.join(', '))

    // 새로 업로드한 파일 추가
    for(let file of files){
        formData.append('image', file);
    }

    // 새 이미지를 업로드하지 않은 경우
    if(files.length === 0){
        formData.append('image', null);
    }
    
    formData.append('title', title);
    formData.append('category', categoryBoolean);
    formData.append('hashtag', hashtag);
    formData.append('price', price);
    formData.append('unit', unit);
    formData.append('description', description);

    try{
        const response = await axios.put(`${BASE_URL}/products/${productId}`, formData, config);
        console.log(response);
        window.location.href= `./my-product.html?id=${farmId}`;
    }catch(err){
        console.error(err);
    }
}
