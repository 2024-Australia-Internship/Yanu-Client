window.onload = () =>{
    const userId = JSON.parse(getCookie('userdata')).id;

    axios.get(`${BASE_URL}/carts`, config)
    .then((response) => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    })
    showProducts();
}

function showProducts(){
    let productListDiv = document.getElementsByClassName('product-list-div')[0];

    let productDiv = document.createElement('div');
    productDiv.className = 'product-div';

    let productInfoDiv = document.createElement('div');
    productInfoDiv.className = 'product-info-div';

    let productName = document.createElement('div');
    productName.className = 'product-name';
    productName.innerText = 'Fresh carrot!';

    let productFarmName = document.createElement('div');
    productFarmName.className = 'product-farm-name';
    productFarmName.innerText = 'Annie\'s farm';

    let productDescription = document.createElement('div');
    productDescription.className = 'product-description';
    productDescription.innerText = 'These carrots are ones I grew with great care. The taste and aroma are so good';

    let productDetail = document.createElement('div');
    productDetail.className = 'product-detail';

    let productUnitDiv = document.createElement('div');
    productUnitDiv.className = 'product-unit-div';

    let productPrice = document.createElement('div');
    productPrice.className = 'product-price';
    productPrice.innerText = '$ 57';

    let productUnit = document.createElement('div');
    productUnit.className = 'product-unit';
    productUnit.innerText = '/ kg';

    productUnitDiv.appendChild(productPrice)
    productUnitDiv.appendChild(productUnit)

    let productQuantity = document.createElement('div');
    productQuantity.className = 'product-quantity';

    let productQuantityBtnMinus = document.createElement('iconify-icon');
    productQuantityBtnMinus.className = 'product-quantity-btn';
    productQuantityBtnMinus.icon = "system-uicons:minus"

    let productMyquantity = document.createElement('div');
    productMyquantity.className = 'product-my-quantity';
    productMyquantity.innerText = '3';

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
    productImg.src = '/images/product-img.png';

    let productDeleteBtn = document.createElement('iconify-icon');
    productDeleteBtn.className = 'product-delete-btn';
    productDeleteBtn.icon = 'mynaui:x';

    productDiv.appendChild(productImg);    
    productDiv.appendChild(productInfoDiv);    
    productDiv.appendChild(productDeleteBtn);    

    productListDiv.appendChild(productDiv);
}