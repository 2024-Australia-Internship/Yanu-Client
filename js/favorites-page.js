const productDiv = document.getElementsByClassName('products-div')[0];
const favoritesFarmsDiv = document.getElementsByClassName('favorites-farms-div')[0];

window.onload = async() => {
    try{
        const productRes = await axios.get(`${BASE_URL}/favorites/products`, config)
        showProducts(productRes.data)

        const farmRes = await axios.get(`${BASE_URL}/favorites/farms`, config);
        showFarms(farmRes.data)

    }catch(err){
        console.error(err);
    }
    getRecentProductInfo();
}

function showFarms(farms){
    farms.forEach(farm => {
        console.log(farm);
        let favoritesFarm = document.createElement('div');
        favoritesFarm.classList.add('farm');
        favoritesFarm.classList.add('favorites-farm');
    
        let farmDetailDiv = document.createElement('div');
        farmDetailDiv.className = "farm-detail-div";
    
        let farmName = document.createElement('div');
        farmName.className = 'farm-username';
        farmName.innerText = farm.businessName;
    
        let farmUsername = document.createElement('div');
        farmUsername.className = 'farm-username';
        farmUsername.innerText = farm.farmName;
    
        let farmReviewDiv = document.createElement('div');
        farmReviewDiv.className = 'farm-review-div';
    
        let farmReviewDetail = document.createElement('div');
        farmReviewDetail.className = 'farm-review-detail';
    
        let farmProducts = document.createElement('div');
        farmProducts.className = 'farm-products';
        farmProducts.innerText = `${farm.products.length} products`
    
        let farmReviews = document.createElement('div');
        farmReviews.className = 'farm-reviews';
        farmReviews.innerText = `${farm.reviews.length} review`
    
        let farmReviewHearts = document.createElement('div');
        farmReviewHearts.className = 'farm-review-hearts';
    
        farmReviewDetail.appendChild(farmProducts);
        farmReviewDetail.appendChild(farmReviews);
        farmReviewDetail.appendChild(farmReviewHearts);
    
        let heartIcon = document.createElement('iconify-icon');
        heartIcon.className = 'farm-heart-icon';
        heartIcon.icon = 'ph:heart-fill'

        farmReviewDiv.appendChild(farmReviewDetail);
        farmReviewDiv.appendChild(heartIcon);
    
        farmDetailDiv.appendChild(farmName);
        farmDetailDiv.appendChild(farmUsername);
        farmDetailDiv.appendChild(farmReviewDiv);
    
        let farmImg = document.createElement('img');
        farmImg.className = 'farm-img';
        farmImg.src = '/images/product-img.png';
        favoritesFarm.appendChild(farmImg);
        favoritesFarm.appendChild(farmDetailDiv);
    
        favoritesFarmsDiv.appendChild(favoritesFarm);

        farmImg.onclick = () => window.location.href = `/html/farmer-page.html?user_code=${farm.user_id}&farm_code=${farm.farm_id}`;
        farmName.onclick = () => window.location.href = `/html/farmer-page.html?user_code=${farm.user_id}&farm_code=${farm.farm_id}`;
    
        heartIcon.onclick = () => clickFavorites(farm.farm_id, 'farmId', 'farms', heartIcon)
    })
}

function getRecentProduct(){
    let recentItems = localStorage.getItem('recent');
    if(!recentItems){
        localStorage.setItem('recent', []);
        return [];
    }
    return JSON.parse(recentItems);
}

async function getRecentProductInfo(){
    const recentItems = getRecentProduct();
    console.log(recentItems);
    for (const i in recentItems) {
        try {
            let product = await axios.get(`${BASE_URL}/products/product/${recentItems[i]}`, config);
            showRecentProduct(product.data)
        } catch (error) {
            if(error.response.status == '404'){
                let recent = JSON.parse(localStorage.getItem('recent'));
                recent.splice(i, 1);
                localStorage.setItem('recent', JSON.stringify(recent));
            }
        }
    }
}

function showProducts(productList) {
    let favoritesProductsDiv = document.getElementsByClassName('favorites-products-div')[0];

    productList.forEach(product => {
        console.log(product);
        let productBox = document.createElement('div');
        productBox.className = `favorites-product`;

        let productDetailDiv = document.createElement('div');
        productDetailDiv.className = 'favorites-product-detail-div';

        let productName = document.createElement('div');
        productName.className = 'favorites-product-name';
        productName.innerText = product.title;

        let productFarmName = document.createElement('div');
        productFarmName.className = 'favorites-product-farm-name';
        productFarmName.innerText = product.businessName;

        let productDetail = document.createElement('div');
        productDetail.className = "favorites-product-detail";

        let productPriceDiv = document.createElement('div');
        productPriceDiv.className = "favorites-product-price-div";

        let productPrice = document.createElement('div');
        productPrice.className = "favorites-product-price";
        productPrice.innerText = `$ ${product.price}`;

        let productUnit = document.createElement('div');
        productUnit.className = "favorites-product-unit";
        productUnit.innerText = ` / ${product.unit}`;

        productPriceDiv.appendChild(productPrice);
        productPriceDiv.appendChild(productUnit);

        let favoritesHeartBtn = document.createElement('iconify-icon');
        favoritesHeartBtn.className = 'favorites-heart-btn';
        favoritesHeartBtn.icon = 'ph:heart-fill';

        productDetail.appendChild(productPriceDiv);
        productDetail.appendChild(favoritesHeartBtn);

        productDetailDiv.appendChild(productName);
        productDetailDiv.appendChild(productFarmName);
        productDetailDiv.appendChild(productDetail);

        let favoriteProductImg = document.createElement('img');
        favoriteProductImg.className = 'favorites-product-img';
        favoriteProductImg.src = '/images/product-img.png';

        productBox.appendChild(favoriteProductImg);
        productBox.appendChild(productDetailDiv);

        favoritesProductsDiv.appendChild(productBox);

        favoriteProductImg.onclick = () => moveProductPage(product.product_id, product.user_id, product.farm_id);
        productName.onclick = () => moveProductPage(product.product_id, product.user_id, product.farm_id);
        

        favoritesHeartBtn.onclick = () => {
            clickFavorites(product.product_id, 'productId', 'products', favoritesHeartBtn)
        }
    })
}

function showRecentProduct(productData) {
    const { userId, farmId, productId, title, price, unit, heart } = productData;

    let product = document.createElement('div');
    product.className = 'product';

    let productDetailDiv = document.createElement('div');
    productDetailDiv.className = "product-detail-div";

    let productName = document.createElement('div');
    productName.className = "product-name";
    productName.innerText = title;

    let productPriceDiv = document.createElement('div');
    productPriceDiv.className = "product-price-div";

    let productPrice = document.createElement('div');
    productPrice.className = "product-price";
    productPrice.innerText = `$ ${price}`;

    let productUnit = document.createElement('div');
    productUnit.className = "product-unit";
    productUnit.innerText = `/ ${unit}`;

    productPriceDiv.appendChild(productPrice);
    productPriceDiv.appendChild(productUnit);

    productDetailDiv.appendChild(productName);
    productDetailDiv.appendChild(productPriceDiv);

    let productImg = document.createElement('img');
    productImg.className = 'product-img';
    productImg.src = `${IMAGE_URL}${productData.images[0]}`;

    let heartBtn = document.createElement('iconify-icon');
    heartBtn.className = 'heart-btn';
    heartBtn.icon = heart ? 'ph:heart-fill' : 'ph:heart';

    product.appendChild(productImg);
    product.appendChild(heartBtn);
    product.appendChild(productDetailDiv);

    productDiv.appendChild(product);

    productName.onclick = () => moveProductPage(productId, userId, farmId);
    productImg.onclick = () => moveProductPage(productId, userId, farmId);

    heartBtn.onclick = () => clickFavorites(productId, 'productId', 'products', heartBtn)
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