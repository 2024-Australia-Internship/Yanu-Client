const recentlySearchDiv = document.getElementsByClassName('recently-search-div')[0];

window.onload = () => {
    showRecentlySearched();
}

function deleteRecentlySearch(e){
    let recentSearchValue = JSON.parse(localStorage.getItem("recentSearch"));
    let deleteText = e.parentNode.firstChild.innerText;
    let deleteIndex = recentSearchValue.indexOf(deleteText);
    recentSearchValue.splice(deleteIndex, 1);
    localStorage.setItem("recentSearch", JSON.stringify(recentSearchValue));
    showRecentlySearched();
}

function deleteAll(){
    localStorage.setItem("recentSearch", '[]');
    showRecentlySearched();
}

function chooseCategory(flag){
    let vegetableBtn = document.getElementsByClassName('vegetable-btn')[0];
    let fruitBtn = document.getElementsByClassName('fruit-btn')[0];
    if(flag){ //vegetable
        vegetableBtn.classList.add('choose-category');
        fruitBtn.classList.remove('choose-category');
    }else{ //fruie
        vegetableBtn.classList.remove('choose-category');
        fruitBtn.classList.add('choose-category');
    }
}

function search(){
    let searchValue = document.getElementsByClassName('search-input')[0].value;
    let searchArr = getRecentlySearched();
    
    searchArr.push(searchValue);
    localStorage.setItem('recentSearch', JSON.stringify(searchArr));
    showRecentlySearched();

    let chooseCategory = document.getElementsByClassName('choose-category')[0];

    if(chooseCategory == undefined){ // 카테고리를 선택하지 않은 경우
        searchProduct(searchValue);
    }else{ // 카테고리를 선택한 경우
        chooseCategory = chooseCategory.innerText.toLowerCase();
        searchProductWithCategory(searchValue, chooseCategory);
    }  
}

function searchProduct(searchValue){
    axios.get(`${BASE_URL}/searches/${searchValue}`, config)
    .then(response => {
        showSearchAnswer(response.data);
        console.log(response);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        if(error.response.status == 404) {
            recentlySearchDiv.style.display = 'none';
        }
    });
}

function searchProductWithCategory(searchValue, chooseCategory){
    axios.get(`${BASE_URL}/searches/${searchValue}/${chooseCategory}`, config)
    .then(response => {
        console.log(response);
        showSearchAnswer(response.data);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        if(error.response.status == 404) {
            recentlySearchDiv.style.display = 'none';
        }
    });
}

function getRecentlySearched() {
    let recentSearchValue = localStorage.getItem("recentSearch");
    if(!recentSearchValue){
        localStorage.setItem("recentSearch", []);
        return [];
    }
    return JSON.parse(recentSearchValue);
}

function showRecentlySearched(){
    let recentSearchList = document.getElementsByClassName('recently-search-list')[0];
    let recentSearchValue = getRecentlySearched();
    console.log(recentSearchValue);
    recentSearchList.innerHTML = '';

    recentSearchValue.forEach(value => {
        let recentlySearch = document.createElement('div');
        recentlySearch.className = "recently-search";
        recentlySearch.onclick = () => searchProduct(value)

        let recentlySearchName = document.createElement('div');
        recentlySearchName.className = "recently-search-name";
        recentlySearchName.innerText = value;

        recentlySearch.appendChild(recentlySearchName);
        recentlySearch.innerHTML += `<iconify-icon icon="mynaui:x" class="recently-search-delete-icon" onclick="deleteRecentlySearch(this)"></iconify-icon>`;
    
        recentSearchList.appendChild(recentlySearch);
    })
}

function showSearchAnswer(products){
    console.log(products)
    recentlySearchDiv.style.display = 'none';

    let prductsDiv = document.getElementsByClassName('products-div')[0];
    prductsDiv.innerHTML = ''
    prductsDiv.style.display = 'grid';

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
    
        let productLike = document.createElement('iconify-icon');
        productLike.icon = "ph:heart";
        productLike.classList.add("heart-btn")
        productLike.classList.add("product-btn")

        productDetail.appendChild(productPriceDiv);
        productDetail.appendChild(productLike);
    
        productDetailDiv.appendChild(productName);
        productDetailDiv.appendChild(productFarmName);
        productDetailDiv.appendChild(productDetail);
    
        let productImg = document.createElement('img');
        // productImg.src = products[i].product_image;
        productImg.className = 'product-img';
        product.appendChild(productImg);
        product.appendChild(productDetailDiv);
        
        productName.onclick = () => moveProductPage(value.productId, value.userId, value.farmId);
        productImg.onclick = () => moveProductPage(value.productId, value.userId, value.farmId);
    
        prductsDiv.appendChild(product);

        productLike.onclick = () => clickFavorites(value.productId, 'productId', 'products', productLike)
    })
}