let prductsDiv = document.getElementsByClassName('products-div')[0];
console.log(window.localStorage.getItem('user_code'));

for(let i = 0; i<20; i++){
    let product = document.createElement('div');
    product.className = 'product';

    let productDetailDiv = document.createElement('div');
    productDetailDiv.className = 'product-detail-div';

    let productName = document.createElement('div');
    productName.className = 'product-name';
    productName.innerText = "Fresh carrots!"

    let productFarmName = document.createElement('div');
    productFarmName.className = 'product-farm-name';
    productFarmName.innerText = "Annie's Farm";

    let productDetail = document.createElement('div');
    productDetail.className = "product-detail";

    let productPriceDiv = document.createElement('div');
    productPriceDiv.className = "product-price-div";

    let productPrice = document.createElement('div');
    productPrice.className = "product-price";
    productPrice.innerText = '$ 19';

    let productUnit = document.createElement('div');
    productUnit.className = "product-unit";
    productUnit.innerText = ' / kg';

    productPriceDiv.appendChild(productPrice);
    productPriceDiv.appendChild(productUnit);

    productDetail.appendChild(productPriceDiv);
    productDetail.innerHTML += '<iconify-icon icon="ph:heart" class="heart-btn"></iconify-icon>';

    productDetailDiv.appendChild(productName);
    productDetailDiv.appendChild(productFarmName);
    productDetailDiv.appendChild(productDetail);

    product.innerHTML = '<img src="/images/product-img.png" class="product-img">';
    product.appendChild(productDetailDiv);

    prductsDiv.appendChild(product);
}
let heartBtns = [...document.getElementsByClassName("heart-btn")];
heartBtns.forEach((e) => {
    e.onclick = (e) => heartToggle(e);
});

function heartToggle(e){
    if(e.target.classList.contains('choose-heart-btn')){
        e.target.classList.remove('choose-heart-btn');
        e.target.icon = 'ph:heart';
    }else{
        e.target.classList.add('choose-heart-btn');
        e.target.icon = 'ph:heart-fill';
    }
}

function hidePopup(){
    let popup = document.getElementsByClassName('popup-background')[0];
    popup.style.visibility = "hidden";
}