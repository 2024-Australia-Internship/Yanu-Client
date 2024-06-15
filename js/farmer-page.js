const urlParams = new URL(location.href).searchParams;
const user_code = urlParams.get('user_code');
const farm_code = urlParams.get('farm_code');

window.onload = async() => {
    let farmName = document.getElementsByClassName('farm-name')[0];
    let backImg = document.getElementsByClassName('farmer-title-div')[0];
    let profileImg = document.getElementsByClassName('farmer-profile-img')[0];
    let uglyPercent = document.getElementsByClassName('farmer-kind-percent')[0];
    let productsCnt = document.getElementsByClassName('farmer-products-cnt')[0];
    let heartBtn = document.getElementsByClassName('favorite-icon')[0];
    let reviewsCnt = document.getElementsByClassName('farmer-review-cnt')[0];

    try{
        let resFarm = await axios.get(`${BASE_URL}/farms/${user_code}`, config);
        profileImg.src = `${IMAGE_URL}${resFarm.data.profile}`
        backImg.style.backgroundImage = resFarm.data.farmProfile ? `url(${IMAGE_URL}${resFarm.data.farmProfile})` : '/images/farmer-registration-back-img.svg'
        heartBtn.icon = resFarm.data.heart ? "ph:heart-fill" : "ph:heart";
        const { businessName } = resFarm.data;
        farmName.innerText = businessName;

        let resProduct = await axios.get(`${BASE_URL}/products/farm/${farm_code}`, config);
        productsCnt.innerText = `${resProduct.data.length} products`;
        showFarmerProducts(resProduct.data);
        showBestSellers(resProduct.data)

        let resReview = await axios.get(`${BASE_URL}/farms/${farm_code}/reviews`, config);
        reviewsCnt.innerText = `${resReview.data.length} reviews`
        showReviews(resReview.data)

        let resUgly = await axios.get(`${BASE_URL}/farms/${user_code}/uglypercent`, config)
        uglyPercent.innerText = `${resUgly.data.uglypercent}%`
    }catch(err){
        console.error(err);
    }
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
        productImg.src = `${IMAGE_URL}${value.images[0]}`;
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
    const limit = products.length < 5 ? products.length : 5
    
    for(let i = 0; i<limit; i++){
        let bestSeller = document.createElement('div');
        bestSeller.className = 'best-seller';
    
        let bestSellerImgDiv = document.createElement('div');
        bestSellerImgDiv.className = "best-seller-img-div";
    
        let bestSellerImg = document.createElement('img');
        bestSellerImg.className = 'best-seller-img';
        bestSellerImg.src = `${IMAGE_URL}${products[i].images[0]}`

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

        bestSellerImgDiv.appendChild(bestSellerImg)
    
        bestSellerDiv.appendChild(bestSeller);

        bestSeller.onclick = () => moveProductPage(products[i].productId, products[i].userId, products[i].farmId);
    }
    
}

function showReviews(reviews){
    let allReviewsDiv = document.getElementsByClassName('all-reviews')[0];
    let starAvgBox = document.getElementsByClassName('star-avg')[0];
    let reviewAvg = 0;

    reviews.forEach(review => {
        console.log(review);
        let allReview = document.createElement('div');
        allReview.className = 'all-review';
    
        let allReviewTitleDiv = document.createElement('div');
        allReviewTitleDiv.className = 'all-review-title-div';
    
        let allReviewUserInfo = document.createElement('div');
        allReviewUserInfo.className = 'all-review-user-info';
    
        let userName = document.createElement('div');
        userName.className = 'user-name';
        userName.innerText = review.name;
    
        let reviewDate = document.createElement('div');
        reviewDate.className = 'review-date';
        reviewDate.innerText = review.createAt.replaceAll('-', '.');
    
        allReviewUserInfo.appendChild(userName);
        allReviewUserInfo.appendChild(reviewDate);
    
        let allReviewStars = document.createElement('div');
        allReviewStars.className = 'all-review-stars';
    
        allReviewStars.innerHTML += `<iconify-icon icon="ph:star-fill" class="review-star-icon"></iconify-icon>`.repeat(review.starrating);
        
    
        allReviewTitleDiv.appendChild(allReviewUserInfo);
        allReviewTitleDiv.appendChild(allReviewStars);
    
        let reviewDetailDiv = document.createElement('div');
        reviewDetailDiv.className = 'review-detail-div';
    
        let userProfileImgDiv = document.createElement('div');
        userProfileImgDiv.className = 'user-profile-img-div';
    
        let allReviewProfileImg = document.createElement('img');
        allReviewProfileImg.className = 'all-review-profile-img';
        allReviewProfileImg.src = `${IMAGE_URL}${review.reviewImages[0]}`;
    
        userProfileImgDiv.appendChild(allReviewProfileImg);
    
        let reviewDetail = document.createElement('div');
        reviewDetail.className = 'review-detail';
        reviewDetail.innerText = review.content;
    
        reviewDetailDiv.appendChild(userProfileImgDiv);
        reviewDetailDiv.appendChild(reviewDetail);
    
        let allReviewProductBtn = document.createElement('div');
        allReviewProductBtn.className = 'all-review-product-btn';
    
        let allReviewProductTitle = document.createElement('div');
        allReviewProductTitle.className = 'all-review-product-title';
        allReviewProductTitle.innerText = review.title;
    
        let moveProductBtn = document.createElement('iconify-icon');
        moveProductBtn.className = 'move-product-btn';
        moveProductBtn.icon = 'iconamoon:arrow-up-2-thin';

        allReviewProductBtn.appendChild(allReviewProductTitle);
        allReviewProductBtn.appendChild(moveProductBtn);
    
        allReview.appendChild(allReviewTitleDiv);
        allReview.appendChild(reviewDetailDiv);
        allReview.appendChild(allReviewProductBtn);
    
        allReviewsDiv.appendChild(allReview);

        allReviewProductBtn.onclick = () =>  moveProductPage(review.productId, user_code, farm_code);
        
        reviewAvg += review.starrating
    })

    if(reviews.length === 0){ // 리뷰가 없는 경우
        starAvgBox.innerText = reviewAvg
    }else{
        starAvgBox.innerText = (reviewAvg / reviews.length).toFixed(1);
    }
}

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

