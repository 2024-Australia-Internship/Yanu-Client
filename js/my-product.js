window.onload = () => {
    axios.get(`${BASE_URL}/products/farm/5`, config)
    .then(response => {
        console.log(response);
        showProducts(response.data);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function showProducts(products){
    console.log(products);
    let prductsDiv = document.getElementsByClassName('products-div')[0];
    // 상품 id, title, farmname, price, unit, 

    products.forEach(value => {
        let product = document.createElement('div');
        product.classList.add('product');
        // product.classList.add(`${products[i].user_code}`);
        // product.id = products[i].product_code;

        let productDetailDiv = document.createElement('div');
        productDetailDiv.className = 'product-detail-div';

        let productName = document.createElement('div');
        productName.className = 'product-name';
        productName.innerText = value.title;

        let productFarmName = document.createElement('div');
        productFarmName.className = 'product-farm-name';
        productFarmName.innerText = 'Annie\'s Farm';

        let productDetail = document.createElement('div');
        productDetail.className = "product-detail";

        let productPriceDiv = document.createElement('div');
        productPriceDiv.className = "product-price-div";

        let productPrice = document.createElement('div');
        productPrice.className = "product-price";
        productPrice.innerText = `$ ${value.price}`;

        let productUnit = document.createElement('div');
        productUnit.className = "product-unit";
        productUnit.innerText = ` / ${value.unit}`;

        productPriceDiv.appendChild(productPrice);
        productPriceDiv.appendChild(productUnit);

        productDetail.appendChild(productPriceDiv);
        productDetail.innerHTML += `<iconify-icon icon="quill:meatballs-h" class="edit-btn"></iconify-icon>`;

        productDetailDiv.appendChild(productName);
        productDetailDiv.appendChild(productFarmName);
        productDetailDiv.appendChild(productDetail);

        let productImg = document.createElement('img');
        // productImg.src = images[i];
        productImg.className = 'product-img';
        product.appendChild(productImg);
        product.appendChild(productDetailDiv);

        productName.onclick = () => moveProductPage(product.id);
        productImg.onclick = () => moveProductPage(product.id);

        prductsDiv.appendChild(product);
    })

}

window.onclick = e => editProduct(e);


function editProduct(e){
    let editPopup = document.getElementsByClassName('edit-popup')[0];

    if(e.target.className === 'edit-btn'){
        let position = e.target.getBoundingClientRect();

        editPopup.style.display = 'block';
        editPopup.style.top = `${position.top + scrollY + 17}px`;
        editPopup.style.left = `${position.left - 75}px`;
    }else{
        editPopup.style.display = 'none';
    }
}

function moveProductPage(id){
    window.location.href = `/html/product-page.html?product_code=${id}`
}
