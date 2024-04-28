if(window.localStorage.getItem('first-login') === 'false'){
    let popup = document.getElementsByClassName('popup-background')[0];
    popup.style.visibility = "hidden";
}

window.onload = () => {
    axios.get(`${BASE_URL}/users`)
    .then(response => {
        console.log(response);
        let username = document.getElementsByClassName('welcome-username')[0];
        username.innerText = response.data.userAllInfo[0].nickname
        if(response.data.userAllInfo[0].is_farmer){
            document.getElementsByClassName('registration-product-btn')[0].style.display = 'flex';
        }
        getProducts();
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}


function getProducts(){
    axios.get(`${BASE_URL}/products`)
    .then(response => {
        console.log(response);
        let farmName = response.data.farmName;
        showProducts(response.data.products, response.data.firstProductImageURL, farmName);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

let prductsDiv = document.getElementsByClassName('products-div')[0];

function showProducts(products, images, farmNames){
    console.log(products);
    for(let i = 0; i<products.length; i++){
        // console.log(i.product_image.split(',')[0]);
        let product = document.createElement('div');
        product.classList.add('product');
        product.classList.add(`${products[i].user_code}`);
        product.id = products[i].product_code;
    
        let productDetailDiv = document.createElement('div');
        productDetailDiv.className = 'product-detail-div';
    
        let productName = document.createElement('div');
        productName.className = 'product-name';
        productName.innerText = products[i].product_title;
    
        let productFarmName = document.createElement('div');
        productFarmName.className = 'product-farm-name';
        productFarmName.innerText = farmNames[i];
    
        let productDetail = document.createElement('div');
        productDetail.className = "product-detail";
    
        let productPriceDiv = document.createElement('div');
        productPriceDiv.className = "product-price-div";
    
        let productPrice = document.createElement('div');
        productPrice.className = "product-price";
        productPrice.innerText = `$ ${products[i].product_price}`;
    
        let productUnit = document.createElement('div');
        productUnit.className = "product-unit";
        productUnit.innerText = ` / ${products[i].product_unit}`;
    
        productPriceDiv.appendChild(productPrice);
        productPriceDiv.appendChild(productUnit);
    
        productDetail.appendChild(productPriceDiv);
        productDetail.innerHTML += `<iconify-icon icon="ph:heart" class="heart-btn product-btn"></iconify-icon>`;
    
        productDetailDiv.appendChild(productName);
        productDetailDiv.appendChild(productFarmName);
        productDetailDiv.appendChild(productDetail);
    
        let productImg = document.createElement('img');
        productImg.src = images[i];
        productImg.className = 'product-img';
        product.appendChild(productImg);
        product.appendChild(productDetailDiv);
        
        productName.onclick = () => moveProductPage(product.id, products[i].user_code);
        productImg.onclick = () => moveProductPage(product.id, products[i].user_code);
    
        prductsDiv.appendChild(product);
    }

    let heartBtns = [...document.getElementsByClassName("heart-btn")];
    heartBtns.forEach((e) => {
        e.onclick = (e) => heartToggle(e);
    });
}



let productss = [...document.getElementsByClassName('product')];
productss.forEach((e) => {
    e.onclick = (e) => {
        console.log(e);
    }
})

function moveProductPage(id, user_code){
    console.log(id);
    window.location.href = `/html/product-page.html?product_code=${id}&user_code=${user_code}`
}



function hidePopup(flag){
    console.log(window.localStorage.getItem('first-login'));
    window.localStorage.setItem('first-login', false);
    let popup = document.getElementsByClassName('popup-background')[0];
    popup.style.visibility = "hidden";

    if(flag) window.location.href = '/html/farmer-registration.html';
}

