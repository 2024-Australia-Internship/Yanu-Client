const user_code = getCookie('user_code');


window.onload = () => {
    console.log(user_code);
    axios.get(`${BASE_URL}/hearts/${user_code}/product`)
        .then(response => {
            console.log(response)
            console.log(response.data.productList[0].product);
            showProducts(response.data.productList[0].product, response.data.firstProductImageURL);
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
}

function showProducts(productList, images) {
    let favoritesProductsDiv = document.getElementsByClassName('favorites-products-div')[0];
    console.log(productList.length)
    for (let i = 0; i < productList.length; i++) {
        console.log(productList[i].product_image.split(",")[0])
        for (let j of images) {
            let image = j.split("/");
            console.log ( productList[i].product_image.split(",")[0]+ "   " + j)
            if (image[image.length - 1] == productList[i].product_image.split(",")[0]) {
                console.log (i + "   " + j)
                console.log(productList[i].product_image.split(",")[0])
                let product = document.createElement('div');
                product.className = `favorites-product ${productList[i].user_code}`;
                product.id = productList[i].product_code;

                let productDetailDiv = document.createElement('div');
                productDetailDiv.className = 'favorites-product-detail-div';

                let productName = document.createElement('div');
                productName.className = 'favorites-product-name';
                productName.innerText = productList[i].product_title;

                let productFarmName = document.createElement('div');
                productFarmName.className = 'favorites-product-farm-name';
                productFarmName.innerText = "Annie's Farm";

                let productDetail = document.createElement('div');
                productDetail.className = "favorites-product-detail";

                let productPriceDiv = document.createElement('div');
                productPriceDiv.className = "favorites-product-price-div";

                let productPrice = document.createElement('div');
                productPrice.className = "favorites-product-price";
                productPrice.innerText = `$ ${productList[i].product_price}`;

                let productUnit = document.createElement('div');
                productUnit.className = "favorites-product-unit";
                productUnit.innerText = ` / ${productList[i].product_unit}`;

                productPriceDiv.appendChild(productPrice);
                productPriceDiv.appendChild(productUnit);

                productDetail.appendChild(productPriceDiv);
                productDetail.innerHTML += '<iconify-icon icon="ph:heart-fill" class="favorites-heart-btn"></iconify-icon>';

                productDetailDiv.appendChild(productName);
                productDetailDiv.appendChild(productFarmName);
                productDetailDiv.appendChild(productDetail);

                product.innerHTML = `<img src=${images[i]} class="favorites-product-img">`;
                product.appendChild(productDetailDiv);

                favoritesProductsDiv.appendChild(product);
            }
        }
    }

}
let productDiv = document.getElementsByClassName('products-div')[0];
for (let i = 0; i < 20; i++) {
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



let favoritesFarmsDiv = document.getElementsByClassName('favorites-farms-div')[0];

for (let i = 0; i < 20; i++) {

    let favoritesFarm = document.createElement('div');
    favoritesFarm.classList.add('farm');
    favoritesFarm.classList.add('favorites-farm');

    let farmDetailDiv = document.createElement('div');
    farmDetailDiv.className = "farm-detail-div";

    let farmName = document.createElement('div');
    farmName.className = 'farm-username';
    farmName.innerText = "Annie's Farm";

    let farmUsername = document.createElement('div');
    farmUsername.className = 'farm-username';
    farmUsername.innerText = "Annie Johnson";

    let farmReviewDiv = document.createElement('div');
    farmReviewDiv.className = 'farm-review-div';

    let farmReviewDetail = document.createElement('div');
    farmReviewDetail.className = 'farm-review-detail';

    let farmProducts = document.createElement('div');
    farmProducts.className = 'farm-products';
    farmProducts.innerText = '120 products'

    let farmReviews = document.createElement('div');
    farmReviews.className = 'farm-reviews';
    farmReviews.innerText = '23 review'

    let farmReviewHearts = document.createElement('div');
    farmReviewHearts.className = 'farm-review-hearts';

    let farmReviewHeartCnt = document.createElement('div');
    farmReviewHeartCnt.className = 'farm-review-heart-cnt';
    farmReviewHeartCnt.innerText = '1,232'

    farmReviewHearts.innerHTML = `<iconify-icon icon="ph:heart-fill" class="farm-review-heart-icon"></iconify-icon>`;
    farmReviewHearts.appendChild(farmReviewHeartCnt);

    farmReviewDetail.appendChild(farmProducts);
    farmReviewDetail.appendChild(farmReviews);
    farmReviewDetail.appendChild(farmReviewHearts);

    farmReviewDiv.appendChild(farmReviewDetail);
    farmReviewDiv.innerHTML += `<iconify-icon icon="ph:heart-fill" class="farm-heart-icon"></iconify-icon>`;

    farmDetailDiv.appendChild(farmName);
    farmDetailDiv.appendChild(farmUsername);
    farmDetailDiv.appendChild(farmReviewDiv);

    favoritesFarm.innerHTML = `<img src="/images/product-img.png" class="farm-img">`
    favoritesFarm.appendChild(farmDetailDiv);

    favoritesFarmsDiv.appendChild(favoritesFarm);
}

let heartBtns = [...document.getElementsByClassName('heart-btn')];
heartBtns.forEach((e) => {
    e.onclick = (e) => heartProduct(e);
});
let favoritesHeartBtns = [...document.getElementsByClassName('favorites-heart-btn')];
favoritesHeartBtns.forEach((e) => {
    e.onclick = (e) => FavoriteHeartProduct(e);
});

let farmHeartBtns = [...document.getElementsByClassName('farm-heart-icon')];
farmHeartBtns.forEach((e) => {
    e.onclick = (e) => FavoriteHeartProduct(e);
});

function heartProduct(e) {
    console.log(e.target);
    if (e.target.classList.contains('choose-heart-btn')) {
        e.target.classList.remove('choose-heart-btn');
        e.target.icon = 'ph:heart';
    } else {
        e.target.classList.add('choose-heart-btn');
        e.target.icon = 'ph:heart-fill';
    }
}

function FavoriteHeartProduct(e) {
    console.log(e.target);
    if (e.target.classList.contains('choose-heart-btn')) {
        e.target.classList.remove('choose-heart-btn');
        e.target.icon = 'ph:heart-fill';
    } else {
        e.target.classList.add('choose-heart-btn');
        e.target.icon = 'ph:heart';
    }
}

function chooseFavoritesCategory(category) {
    let products = document.getElementsByClassName('favorites-products-div')[0];
    let farms = document.getElementsByClassName('favorites-farms-div')[0];

    let productsBtn = document.getElementsByClassName('products-btn')[0];
    let farmsBtn = document.getElementsByClassName('farms-btn')[0];

    console.log(productsBtn);
    console.log(farmsBtn);
    if (category) { //products
        products.style.display = 'grid';
        farms.style.display = 'none';

        productsBtn.classList.add('choose-category-btn')
        farmsBtn.classList.remove('choose-category-btn')
    } else { //farms
        farms.style.display = 'grid';
        products.style.display = 'none';

        farmsBtn.classList.add('choose-category-btn')
        productsBtn.classList.remove('choose-category-btn')
    }
}