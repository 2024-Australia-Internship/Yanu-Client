const urlParams = new URL(location.href).searchParams;
const product_info = urlParams.get('product_info');
const json_product_info = JSON.parse(product_info);

let productList = document.getElementsByClassName('checkout-product-list')[0];
let showAllBtn = document.getElementsByClassName('show-all-btn')[0];
let showAllIcon = document.getElementsByClassName('show-all-icon')[0];
let listMore = document.getElementsByClassName('list-more-btn')[0];
let chooseCardBtnList = [...document.getElementsByClassName('choose-card-btn')];
let changeCardDiv = document.getElementsByClassName('change-card-div')[0];
let paymentMethodDiv = document.getElementsByClassName('payment-method-div')[0];
let totalPriceList = document.getElementsByClassName('total-price-div')[0]
let totalPrice = document.getElementsByClassName('total-price')[0];
let chooseCard = 0;
let userName = document.getElementsByClassName('user-name')[0];
let phoneNumber = document.getElementsByClassName('user-phone-num')[0];

window.onload = () => {
    getProducts();
    getUserInfo();
}

async function getProducts() {
    try{
        const response = await axios.get(`${BASE_URL}/products/product/${json_product_info.productId}`, config)
        showProducts([response.data])
    }catch(error){  
        console.error(error);
    }
}

async function getUserInfo() {
    try{
        const response = await axios.get(`${BASE_URL}/users`, config)
        let phone_num = response.data.phonenumber.substring(5);
        phone_num = `${phone_num.substr(0, 3)}-${phone_num.substr(3, 4)}-${phone_num.substr(7)}`
        
        phoneNumber.innerText = phone_num;
    }catch(error){  
        console.error(error);
    }
}

function showProducts(products) {
    let totalPriceCnt = 0;

    products.forEach(product => {
        let productDiv = document.createElement('div');
        productDiv.className = 'product-div';
    
        let productImg = document.createElement('img');
        productImg.className = 'product-img'
        productImg.src = '/images/product-img.png'
    
        let productInfoDiv = document.createElement('div');
        productInfoDiv.className = 'product-info-div';
    
        let div = document.createElement('div');
    
        let productName = document.createElement('div');
        productName.className = 'product-name';
        productName.innerText = product.title;
    
        let farmName = document.createElement('div');
        farmName.className = 'farm-name';
        farmName.innerText = product.business_name;
    
        div.appendChild(productName)
        div.appendChild(farmName)
    
        let productPrice = document.createElement('div');
        productPrice.className = 'product-price';
        productPrice.innerText = `$ ${product.price}`
    
        productInfoDiv.appendChild(div)
        productInfoDiv.appendChild(productPrice)
    
        productDiv.appendChild(productImg)
        productDiv.appendChild(productInfoDiv)
    
        productList.appendChild(productDiv);

        totalPriceCnt += product.price
    })
    
    totalPrice.innerText = `$ ${totalPriceCnt}`
    if(products.length > 2) {
        showAllBtn.classList.add('visibility');
        listMore.classList.add('visibility');
    }else{
        totalPriceList.style.marginTop = '13px';
    }
}

function showAllList(){
    productList.classList.toggle("auto-height");
    listMore.classList.toggle("visibility");
    showAllIcon.classList.toggle('rotate')
}

chooseCardBtnList.forEach((value, index) => {
    value.addEventListener('click', () => changeMyCard(value, index));
});

function changeMyCard(value, index) {
    chooseCardBtnList.forEach((v, i) =>{
        if(i === index) {
            v.classList.add('applyed-card');
            v.innerText = 'Applyed'
            chooseCard = i;
        }else {
            v.classList.remove('applyed-card');
            v.innerText = 'Change'
        }
    })
}

let cardImgArr = ['mastercard', 'mastercard', 'visacard'];
let cardNumArr = ['***123', '***245', '****9009'];

let cardNum = document.getElementsByClassName('card-num')[0];
function showMyCard(){
    let cardImg = document.getElementsByClassName('card-img')[0];
    changeCardDiv.classList.toggle('hide-my-card');
    paymentMethodDiv.classList.toggle('hide-my-card');

    cardImg.src = `/images/${cardImgArr[chooseCard]}.svg`;
    cardNum.innerText = cardNumArr[chooseCard];
}

async function pay() {
    const req = {
        orders: [
            json_product_info
        ]
    }

    try{
        const response = await axios.post(`${BASE_URL}/orders`, req, config);
        window.location.href = `./success-order.html?order_info=${product_info}`
    }catch(error){
        console.error(error);
    }
}
