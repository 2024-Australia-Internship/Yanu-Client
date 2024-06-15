const totalNum = document.getElementsByClassName('total-num')[0];
let totalPrice = 0;

window.onload = async() =>{
    getProducts();
}

async function getProducts() {
    let emptyProduct = document.getElementsByClassName('empty-product-div')[0];
    let orderBox = document.getElementsByClassName('order-div')[0];
    try{
        const response = await axios.get(`${BASE_URL}/carts`, config)
        console.log(response.data);
        showProducts(response.data);
    }catch(error){
        if(error.response.status === 404){
            emptyProduct.style.display = 'flex';
            orderBox.style.display  = 'none';
        }
    }
}

function showProducts(products){
    let productListDiv = document.getElementsByClassName('product-list-div')[0];
    productListDiv.innerText = '';
    
    
    products.forEach(product => {
        let productDiv = document.createElement('div');
        productDiv.className = 'product-div';

        let productInfoDiv = document.createElement('div');
        productInfoDiv.className = 'product-info-div';

        let productName = document.createElement('div');
        productName.className = 'product-name';
        productName.innerText = product.title;

        let productFarmName = document.createElement('div');
        productFarmName.className = 'product-farm-name';
        productFarmName.innerText = product.businessName;

        let productDescription = document.createElement('div');
        productDescription.className = 'product-description';
        productDescription.innerText = product.description;

        let productDetail = document.createElement('div');
        productDetail.className = 'product-detail';

        let productUnitDiv = document.createElement('div');
        productUnitDiv.className = 'product-unit-div';

        let productPrice = document.createElement('div');
        productPrice.className = 'product-price';
        productPrice.innerText = `$ ${product.price}`;

        let productUnit = document.createElement('div');
        productUnit.className = 'product-unit';
        productUnit.innerText = `/ ${product.unit}`;

        productUnitDiv.appendChild(productPrice)
        productUnitDiv.appendChild(productUnit)

        let productQuantity = document.createElement('div');
        productQuantity.className = 'product-quantity';

        let productQuantityBtnMinus = document.createElement('iconify-icon');
        productQuantityBtnMinus.className = 'product-quantity-btn';
        productQuantityBtnMinus.icon = "system-uicons:minus"

        let productMyquantity = document.createElement('div');
        productMyquantity.className = 'product-my-quantity';
        productMyquantity.innerText = product.quantity;

        let productQuantityBtnPlus = document.createElement('iconify-icon');
        productQuantityBtnPlus.className = 'product-quantity-btn';
        productQuantityBtnPlus.icon = "iconoir:plus"

        productQuantity.appendChild(productQuantityBtnMinus);
        productQuantity.appendChild(productMyquantity);
        productQuantity.appendChild(productQuantityBtnPlus);

        productDetail.appendChild(productUnitDiv);
        productDetail.appendChild(productQuantity);

        productInfoDiv.appendChild(productName);
        productInfoDiv.appendChild(productFarmName);
        productInfoDiv.appendChild(productDescription);
        productInfoDiv.appendChild(productDetail);

        let productImg = document.createElement('img');
        productImg.className = 'product-img';
        productImg.src = `${IMAGE_URL}${product.images[0]}`;

        let productDeleteBtn = document.createElement('iconify-icon');
        productDeleteBtn.className = 'product-delete-btn';
        productDeleteBtn.icon = 'mynaui:x';

        productDiv.appendChild(productImg);    
        productDiv.appendChild(productInfoDiv);    
        productDiv.appendChild(productDeleteBtn);    

        productListDiv.appendChild(productDiv);

        productDeleteBtn.onclick = () => {
            deleteProdcut(product.productId);
        }

        productQuantityBtnMinus.onclick = () => {
            onClickMinusBtn(productMyquantity, product.productId, product.price)
        }

        productQuantityBtnPlus.onclick = () => {
            onClickPlusBtn(productMyquantity, product.productId, product.price)
        }

        productImg.onclick = () => moveProductPage(product.productId, product.userId, product.farmId);
        productName.onclick = () => moveProductPage(product.productId, product.userId, product.farmId);
        
        totalPrice += product.price * product.quantity;
    })
    totalNum.innerText = `$ ${totalPrice}`
}

async function setTotalPrice(price) {
    totalPrice += price;
    totalNum.innerText = `$ ${totalPrice}`
}

async function onClickMinusBtn(quantityDiv, productId, price){
    if(quantityDiv.innerText >= 2) {
        quantityDiv.innerText -= 1;
    }else{
        return alert('This is the minimum quantity.')
    }

    const req = {
        productId: {id: productId},
        quantity: parseInt(quantityDiv.innerText)
    }
    
    try{
        const response = await axios.put(`${BASE_URL}/carts/quantity`, req, config)
        console.log(response);
        setTotalPrice(-price)
    }catch(err){
        console.error(err); 
    }
}

async function onClickPlusBtn(quantityDiv, productId, price) {
    quantityDiv.innerText = parseInt(quantityDiv.innerText) + 1;

    const req = {
        productId: {id: productId},
        quantity: parseInt(quantityDiv.innerText)
    }
    
    try{
        const response = await axios.put(`${BASE_URL}/carts/quantity`, req, config)
        console.log(response);
        setTotalPrice(price);
    }catch(err){
        console.error(err); 
    }
}

async function deleteProdcut(productId) {
    const req = {
        ...config,
        data: {
            productId: {id: productId}
        }
    } 

    try{
        const response = await axios.delete(`${BASE_URL}/carts`, req)
        console.log(response);
        getProducts();
    }catch(error){  
        console.error(error);
    }
}

function movePurchasePage(){
    const productListDiv = document.getElementsByClassName('product-list-div')[0];
    if(productListDiv.childNodes.length === 0){
        return alert('There are no products to purchase.');
    }else{
        window.location.href = '/html/purchase-page.html'
    }
}