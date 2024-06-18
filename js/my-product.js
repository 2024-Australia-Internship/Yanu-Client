const urlParams = new URL(location.href).searchParams;
const farmId = urlParams.get('id');
let index = -1;

window.onload = () => {
    getProducts();
}

document.addEventListener('click', (e) => {
    let editDiv = document.getElementsByClassName('edit-popup')[0];
    if(e.target.className != "edit-btn"){
        editDiv.style.visibility = "hidden";
    }
});

function getProducts() {
    axios.get(`${BASE_URL}/products/farm/${farmId}`, config)
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
    prductsDiv.innerHTML = '';

    products.forEach(value => {
        console.log(value.images[0]);
        let product = document.createElement('div');
        product.classList.add('product');

        let productDetailDiv = document.createElement('div');
        productDetailDiv.className = 'product-detail-div';

        let productName = document.createElement('div');
        productName.className = 'product-name';
        productName.innerText = value.title;

        let productFarmName = document.createElement('div');
        productFarmName.className = 'product-farm-name';
        productFarmName.innerText = value.business_name;

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

        let editBtn = document.createElement('iconify-icon');
        editBtn.className = 'edit-btn';
        editBtn.icon = 'quill:meatballs-h';
        editBtn.id = value.productId;

        productDetail.appendChild(productPriceDiv);
        productDetail.appendChild(editBtn);

        productDetailDiv.appendChild(productName);
        productDetailDiv.appendChild(productFarmName);
        productDetailDiv.appendChild(productDetail);

        let productImg = document.createElement('img');
        productImg.src = `${IMAGE_URL}${value.images[0]}`;
        productImg.className = 'product-img';
        product.appendChild(productImg);
        product.appendChild(productDetailDiv);

        productName.onclick = () => moveProductPage(value.productId, value.userId, value.farmId);
        productImg.onclick = () => moveProductPage(value.productId, value.userId, value.farmId);
        
        prductsDiv.appendChild(product);

        editBtn.onclick = () => clickEditBtn(editBtn, value.farmId, value.productId);
    })

}

function clickEditBtn(e, farmId, productId){
    let editDiv = document.getElementsByClassName('edit-popup')[0];
    if(index != productId){
        let buttonRect = e.getBoundingClientRect();
        let buttonX = buttonRect.left + window.pageXOffset;
        let buttonY = buttonRect.top + window.pageYOffset;
        editDiv.style.visibility = "visible";
        editDiv.style.top = `${buttonY + 24}px`;
        editDiv.style.left =`${buttonX - 70}px`;
        index = productId;
    }else{
        editDiv.style.visibility = "hidden";
        index = -1;
    }

    let editBtn = document.getElementsByClassName('edit')[0];
    let deleteBtn = document.getElementsByClassName('delete')[0];

    editBtn.onclick = () => editProduct(productId, farmId)
    deleteBtn.onclick = () => deleteProduct(productId)
}

function editProduct(productId, farmId){
    window.location.href = `./edit-product.html?id=${productId}&farmId=${farmId}`
}

function deleteProduct(productId) {
    if(confirm('Are you sure you want to delete it?')){
        axios.delete(`${BASE_URL}/products`, {
            ...config,
            data: {
                productId:  productId  
            }
        })
        .then(response => {
            console.log(response);
            getProducts();
        })
        .catch(error => {
            console.error(error);
        })
    }
}
