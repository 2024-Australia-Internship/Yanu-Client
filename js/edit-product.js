const urlParams = new URL(location.href).searchParams;
const productId = urlParams.get('id');
const farmId = urlParams.get('farmId');

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
        tagify.addTags(tagify.DOM.tagInput.innerText);
        tagify.DOM.tagInput.innerText = '';
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
    const { title, category, hashtag, price, unit, description } = data;
    let option = document.getElementsByClassName(`option-${unit}`)[0];
    
    titleInput.value = title; // 타이틀 값 넣기
    chooseCategory(category === 'fruit') // 카테고리 선택하기
    tagify.addTags(JSON.parse(hashtag)); // 해시태그 값 넣기
    priceInput.value = price; // 가격 넣기
    handleSelect(option); // 단위 선택하기
    descriptionInput.value = description; // 상품 설명 값 넣기
}

function editProduct() {
    let title = titleInput.value;
    let category = document.getElementsByClassName('choose-category')[0];
    let price = priceInput.value;
    let unit = countryNum.innerText;
    let description = descriptionInput.value;
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

    const req = {
        productId: productId,
        title: title,
        category: categoryBoolean,
        hashtag: hashtag,
        price: price,
        unit: unit,
        description: description
    }

    axios.put(`${BASE_URL}/products`, req, config)
    .then(response => {
        console.log(response);
        window.location.href= `./my-product.html?id=${farmId}`;
    })
    .catch(error => {
        console.error(error);
    });
}
