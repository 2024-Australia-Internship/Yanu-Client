if(window.localStorage.getItem('first-login') === 'false'){
    let popup = document.getElementsByClassName('popup-background')[0];
    popup.style.visibility = "hidden";
}

window.onload = () => {
    let username = document.getElementsByClassName('welcome-username')[0];
    let button = document.getElementsByClassName('registration-product-btn')[0];
    let popup = document.getElementsByClassName('popup-background')[0];

    axios.get(`${BASE_URL}/users`, config)
    .then(response => {
        console.log(response);
        username.innerText = response.data.nickname
        if(response.data.is_farmer){ // farmer인 경우
            button.style.display = 'flex';
        }else{ // farmer가 아닌 경우
            popup.style.visibility = 'visible';
        }
        getProducts();
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}


function getProducts(){
    axios.get(`${BASE_URL}/products`, config)
    .then(response => {
        console.log(response);
        showProducts(response.data);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

let prductsDiv = document.getElementsByClassName('products-div')[0];

function showProducts(products){
    console.log(products);
    // 상품 id, title, farmname, price, unit, 

    products.forEach(value => {
        // console.log(i.product_image.split(',')[0]);
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
        // productFarmName.innerText = farmNames[i];

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
        productDetail.innerHTML += `<iconify-icon icon="ph:heart" class="heart-btn product-btn"></iconify-icon>`;

        productDetailDiv.appendChild(productName);
        productDetailDiv.appendChild(productFarmName);
        productDetailDiv.appendChild(productDetail);

        let productImg = document.createElement('img');
        // productImg.src = images[i];
        productImg.className = 'product-img';
        product.appendChild(productImg);
        product.appendChild(productDetailDiv);

        // productName.onclick = () => moveProductPage(product.id);
        // productImg.onclick = () => moveProductPage(product.id);

        prductsDiv.appendChild(product);
    })

    // let heartBtns = [...document.getElementsByClassName("heart-btn")];
    // heartBtns.forEach((e) => {
    //     e.onclick = (e) => heartToggle(e);
    // });
}



let productss = [...document.getElementsByClassName('product')];
productss.forEach((e) => {
    e.onclick = (e) => {
        console.log(e);
    }
})

function moveProductPage(id){
    window.location.href = `/html/product-page.html?product_code=${id}`
}

function hidePopup(flag){
    console.log(window.localStorage.getItem('first-login'));
    window.localStorage.setItem('first-login', false);
    let popup = document.getElementsByClassName('popup-background')[0];
    popup.style.visibility = "hidden";

    if(flag) window.location.href = '/html/farmer-registration.html';
}

