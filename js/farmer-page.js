const urlParams = new URL(location.href).searchParams;
const user_code = urlParams.get('user_code');
const farm_code = urlParams.get('farm_code');

window.onload = () => {
    let farmName = document.getElementsByClassName('farm-name')[0];
    let backImg = document.getElementsByClassName('farmer-title-div')[0];
    let profileImg = document.getElementsByClassName('farmer-profile-img')[0];
    let uglyPercent = document.getElementsByClassName('farmer-kind-percent')[0];
    let productsCnt = document.getElementsByClassName('farmer-products-cnt')[0];
    let heartBtn = document.getElementsByClassName('favorite-icon')[0];

    axios.get(`${BASE_URL}/farms/${user_code}`, config)
    .then(response => {
        console.log(response);
        heartBtn.icon = response.data.heart ? "ph:heart-fill" : "ph:heart";
        const { businessName, ugly_percent } = response.data;
        farmName.innerText = businessName;
        uglyPercent.innerText = `${ugly_percent}%`
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });

    axios.get(`${BASE_URL}/products/farm/${farm_code}`, config)
    .then(response => {
        console.log(response);
        // productsCnt.innerText = `${response.data.length} products`;
        showFarmerProducts(response.data);
        showBestSellers(response.data)
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function clickFavoriteIcon(event){
    clickFavorites(farm_code, 'farmId', 'farms', event.target);
}

function showFarmerProducts(products){
    let allProductsDiv = document.getElementsByClassName('all-products')[0];
    products.forEach(value => {
        console.log(value)

        let product = document.createElement('div');
        product.className = 'product';
    
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
    
        let productLike = document.createElement('iconify-icon');
        productLike.icon = value.heart ? "ph:heart-fill" : "ph:heart";
        productLike.classList.add("heart-btn")
        productLike.classList.add("product-btn")

        productDetail.appendChild(productPriceDiv);
        productDetail.appendChild(productLike);
    
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

        productLike.onclick = () => clickFavorites(value.productId, 'productId', 'products', productLike)

        allProductsDiv.appendChild(product);
    })
}


function showBestSellers(products){
    let bestSellerDiv = document.getElementsByClassName('best-sellers')[0];
    
    for(let i = 0; i<5; i++){
        let bestSeller = document.createElement('div');
        bestSeller.className = 'best-seller';
    
        let bestSellerImgDiv = document.createElement('div');
        bestSellerImgDiv.className = "best-seller-img-div";
        bestSellerImgDiv.innerHTML += `<img src="/images/product-img.png" class="best-seller-img">`;
    
        let productInfoDiv = document.createElement('div');
        productInfoDiv.className = 'product-info-div';
    
        let productTitle = document.createElement('div');
        productTitle.className = "product-title";
        productTitle.innerText = products[i].title;
    
        let productDetailDiv = document.createElement('div');
        productDetailDiv.className = 'best-product-detail-div';
    
        let productPrice = document.createElement('div');
        productPrice.className = 'product-price';
        productPrice.innerText = `$ ${products[i].price}`;
    
        let productUnit = document.createElement('div');
        productUnit.className = 'product-unit';
        productUnit.innerText = `/ ${products[i].unit}`;
    
        productDetailDiv.appendChild(productPrice);
        productDetailDiv.appendChild(productUnit);
    
        productInfoDiv.appendChild(productTitle);
        productInfoDiv.appendChild(productDetailDiv);
    
        bestSeller.appendChild(bestSellerImgDiv);
        bestSeller.appendChild(productInfoDiv);
    
        bestSellerDiv.appendChild(bestSeller);

        bestSeller.onclick = () => moveProductPage(products[i].productId, products[i].userId, products[i].farmId);
    }
    
}

let allReviewsDiv = document.getElementsByClassName('all-reviews')[0];
for(let i = 0; i<20; i++){
    let allReview = document.createElement('div');
    allReview.className = 'all-review';

    let allReviewTitleDiv = document.createElement('div');
    allReviewTitleDiv.className = 'all-review-title-div';

    let allReviewUserInfo = document.createElement('div');
    allReviewUserInfo.className = 'all-review-user-info';

    let userName = document.createElement('div');
    userName.className = 'user-name';
    userName.innerText = 'Amanda Scott';

    let reviewDate = document.createElement('div');
    reviewDate.className = 'review-date';
    reviewDate.innerText = '2024.01.12';

    allReviewUserInfo.appendChild(userName);
    allReviewUserInfo.appendChild(reviewDate);

    let allReviewStars = document.createElement('div');
    allReviewStars.className = 'all-review-stars';

    for(let j = 0; j<5; j++){
        allReviewStars.innerHTML += `<iconify-icon icon="ph:star-fill" class="review-star-icon"></iconify-icon>`;
    }

    allReviewTitleDiv.appendChild(allReviewUserInfo);
    allReviewTitleDiv.appendChild(allReviewStars);

    let reviewDetailDiv = document.createElement('div');
    reviewDetailDiv.className = 'review-detail-div';

    let userProfileImgDiv = document.createElement('div');
    userProfileImgDiv.className = 'user-profile-img-div';

    let allReviewProfileImg = document.createElement('img');
    allReviewProfileImg.className = 'all-review-profile-img';
    allReviewProfileImg.src = '/images/product-img.png';

    userProfileImgDiv.appendChild(allReviewProfileImg);

    let reviewDetail = document.createElement('div');
    reviewDetail.className = 'review-detail';
    reviewDetail.innerText = `These strawberries are really GOOOOOOOD!! I have two sons and my sons love these strawberry`;

    reviewDetailDiv.appendChild(userProfileImgDiv);
    reviewDetailDiv.appendChild(reviewDetail);

    let allReviewProductBtn = document.createElement('div');
    allReviewProductBtn.className = 'all-review-product-btn';

    let allReviewProductTitle = document.createElement('div');
    allReviewProductTitle.className = 'all-review-product-title';
    allReviewProductTitle.innerText = '[Annie] SWEET SWEET strawberries 🍓';

    allReviewProductBtn.appendChild(allReviewProductTitle);
    allReviewProductBtn.innerHTML += `<iconify-icon icon="iconamoon:arrow-up-2-thin" class="move-product-btn"></iconify-icon>`

    allReview.appendChild(allReviewTitleDiv);
    allReview.appendChild(reviewDetailDiv);
    allReview.appendChild(allReviewProductBtn);

    allReviewsDiv.appendChild(allReview);
}

let heartBtns = [...document.getElementsByClassName("heart-btn")];
heartBtns.forEach((e) => {
    e.onclick = (e) => heartToggle(e);
});

function chooseDetail(flag){
    let productBtn = document.getElementsByClassName('product-btn')[0];
    let reviewBtn = document.getElementsByClassName('review-btn')[0];

    let productDiv = document.getElementsByClassName('products-div')[0];
    let reviewDiv = document.getElementsByClassName('reviews-div')[0];
    if(flag){ //product
        productBtn.classList.add('choose-btn');
        reviewBtn.classList.remove('choose-btn');

        productDiv.style.display = 'inherit'
        reviewDiv.style.display = 'none'
    }else{ //review
        productBtn.classList.remove('choose-btn');
        reviewBtn.classList.add('choose-btn');

        productDiv.style.display = 'none'
        reviewDiv.style.display = 'inherit'
    }
}

