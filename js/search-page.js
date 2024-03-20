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
    console.log(searchValue);
    // localStorage.setItem('recentSearch', '[]');

    let searchArr = JSON.parse(localStorage.getItem('recentSearch'));
    searchArr.push(searchValue);
    localStorage.setItem('recentSearch', JSON.stringify(searchArr));
    showRecentlySearched();
    let chooseCategory = document.getElementsByClassName('choose-category')[0];
    console.log(chooseCategory)
    if(chooseCategory == undefined){
        axios.get(`${BASE_URL}/products/search/${searchValue}`)
        .then(response => {
            console.log(response.data.searchProduct);
            showSearchAnswer(response.data.searchProduct);
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
            if(error.response.status == 404) {
                document.getElementsByClassName('recently-search-div')[0].style.display = 'none';
            }
        });
    }else{
        chooseCategory = chooseCategory.innerText.toLowerCase();
        console.log(chooseCategory);
        axios.get(`${BASE_URL}/products/search/${chooseCategory}/${searchValue}`)
        .then(response => {
            console.log(response);
            showSearchAnswer(response.data.searchProduct);
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
            if(error.response.status == 404) {
                document.getElementsByClassName('recently-search-div')[0].style.display = 'none';
            }
        });
    }  
}

function showRecentlySearched(){
    let recentSearchList = document.getElementsByClassName('recently-search-list')[0];
    let recentSearchValue = JSON.parse(localStorage.getItem("recentSearch"));
    recentSearchList.innerHTML = '';
    recentSearchValue.forEach(value => {
        let recentlySearch = document.createElement('div');
        recentlySearch.className = "recently-search";

        let recentlySearchName = document.createElement('div');
        recentlySearchName.className = "recently-search-name";
        recentlySearchName.innerText = value;

        recentlySearch.appendChild(recentlySearchName);
        recentlySearch.innerHTML += `<iconify-icon icon="mynaui:x" class="recently-search-delete-icon" onclick="deleteRecentlySearch(this)"></iconify-icon>`;
    
        recentSearchList.appendChild(recentlySearch);
    })
}

function showSearchAnswer(products){
    document.getElementsByClassName('recently-search-div')[0].style.display = 'none';
    let prductsDiv = document.getElementsByClassName('products-div')[0];
    prductsDiv.innerHTML = ''
    prductsDiv.style.display = 'grid';

    for(let i = 0; i<products.length; i++){
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
        productFarmName.innerText = "Annie's Farm";
    
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
        // productImg.src = products[i].product_image;
        productImg.className = 'product-img';
        product.appendChild(productImg);
        product.appendChild(productDetailDiv);
        
        // productName.onclick = () => moveProductPage(product.id, products[i].user_code);
        // productImg.onclick = () => moveProductPage(product.id, products[i].user_code);
    
        prductsDiv.appendChild(product);
    }
    let heartBtns = [...document.getElementsByClassName("heart-btn")];
    heartBtns.forEach((e) => {
        e.onclick = (e) => heartToggle(e);
    });
}