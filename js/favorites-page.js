let productDiv = document.getElementsByClassName('products-div')[0];
for(let i = 0; i<20; i++){
    let product = document.createElement('div');
    product.className = 'product';

    let productDetailDiv = document.createElement('div');
    productDetailDiv.className = "product-detail-div";

    let productName = document.createElement('div');
    productName.className = "product-name";
    productName.innerText = "[Annie] Carrot";

    let productPriceDiv = document.createElement('div');
    productPriceDiv.className = "product-price-div";

    let productPrice = document.createElement('div');
    productPrice.className = "product-price";
    productPrice.innerText = "$ 20";

    let productUnit = document.createElement('div');
    productUnit.className = "product-unit";
    productUnit.innerText = "/ kg";

    productPriceDiv.appendChild(productPrice);
    productPriceDiv.appendChild(productUnit);

    productDetailDiv.appendChild(productName);
    productDetailDiv.appendChild(productPriceDiv);

    product.innerHTML += `<img src="/images/product-img.png" class="product-img">`;
    product.innerHTML += `<iconify-icon icon="ph:heart" class="heart-btn"></iconify-icon>`;
    product.appendChild(productDetailDiv);

    productDiv.appendChild(product);
}

let heartBtns = [...document.getElementsByClassName('heart-btn')];
heartBtns.forEach((e) => {
    e.onclick = (e) => heartProduct(e);
});

function heartProduct(e){
    console.log(e.target);
    if(e.target.classList.contains('choose-heart-btn')){
        e.target.classList.remove('choose-heart-btn');
        e.target.icon = 'ph:heart';
    }else{
        e.target.classList.add('choose-heart-btn');
        e.target.icon = 'ph:heart-fill';
    }
}