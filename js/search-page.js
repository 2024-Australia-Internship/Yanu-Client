let deleteBtns = [...document.getElementsByClassName('recently-search-delete-icon')];
deleteBtns.forEach((e) => {
    e.onclick = (e) => deleteRecentlySearch(e);
});
function deleteRecentlySearch(e){
    e.target.parentNode.remove();
}

let prductsDiv = document.getElementsByClassName('products-div')[0];

for(let i = 0; i<20; i++){
    let product = document.createElement('div');
    product.className = 'product';
    // product.id = products[i].product_code;

    let productDetailDiv = document.createElement('div');
    productDetailDiv.className = 'product-detail-div';

    let productName = document.createElement('div');
    productName.className = 'product-name';
    productName.innerText = 'Fresh carrots!';

    let productFarmName = document.createElement('div');
    productFarmName.className = 'product-farm-name';
    productFarmName.innerText = "Annie's Farm";

    let productDetail = document.createElement('div');
    productDetail.className = "product-detail";

    let productPriceDiv = document.createElement('div');
    productPriceDiv.className = "product-price-div";

    let productPrice = document.createElement('div');
    productPrice.className = "product-price";
    productPrice.innerText = `$ 19`;

    let productUnit = document.createElement('div');
    productUnit.className = "product-unit";
    productUnit.innerText = ` / kg`;

    productPriceDiv.appendChild(productPrice);
    productPriceDiv.appendChild(productUnit);

    productDetail.appendChild(productPriceDiv);
    productDetail.innerHTML += '<iconify-icon icon="ph:heart" class="heart-btn"></iconify-icon>';

    productDetailDiv.appendChild(productName);
    productDetailDiv.appendChild(productFarmName);
    productDetailDiv.appendChild(productDetail);

    let productImg = document.createElement('img');
    productImg.src = `/images/ugly-potato.svg`;
    productImg.className = 'product-img';
    product.appendChild(productImg);
    product.appendChild(productDetailDiv);
    
    // productName.onclick = () => moveProductPage(product.id, products[i].user_code);
    // productImg.onclick = () => moveProductPage(product.id, products[i].user_code);

    prductsDiv.appendChild(product);
}

function search(){
    let searchValue = document.getElementsByClassName('search-input')[0].value;
    console.log(searchValue);
}