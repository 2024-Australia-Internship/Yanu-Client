const urlParams = new URL(location.href).searchParams;
const farmId = urlParams.get('id');
let productId;

window.onload = () => {
    getProducts();
}

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
        // productImg.src = images[i];
        productImg.className = 'product-img';
        product.appendChild(productImg);
        product.appendChild(productDetailDiv);

        productName.onclick = () => moveProductPage(value.productId, value.userId, value.farmId);
        productImg.onclick = () => moveProductPage(value.productId, value.userId, value.farmId);
        
        prductsDiv.appendChild(product);
    })

}

window.onclick = e => clickEditBtn(e);


function clickEditBtn(e){
    let editPopup = document.getElementsByClassName('edit-popup')[0];

    if(e.target.className === 'edit-btn'){
        productId = e.target.id;
        let position = e.target.getBoundingClientRect();

        editPopup.style.display = 'block';
        editPopup.style.top = `${position.top + scrollY + 17}px`;
        editPopup.style.left = `${position.left - 75}px`;
    }else{
        editPopup.style.display = 'none';
    }
}

function editProduct(){
    window.location.href = `./edit-product.html?id=${productId}&farmId=${farmId}`
}

function deleteProduct() {
    console.log(productId)
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

function moveProductPage(id){
    window.location.href = `/html/product-page.html?product_code=${id}`
}
