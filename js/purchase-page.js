let productListlength = document.getElementsByClassName('checkout-product-list')[0].childElementCount;
let productList = document.getElementsByClassName('checkout-product-list')[0];
let showAllBtn = document.getElementsByClassName('show-all-btn')[0];
let showAllIcon = document.getElementsByClassName('show-all-icon')[0];
let listMore = document.getElementsByClassName('list-more-btn')[0];
let chooseCardBtnList = [...document.getElementsByClassName('choose-card-btn')];
let changeCardDiv = document.getElementsByClassName('change-card-div')[0];
let paymentMethodDiv = document.getElementsByClassName('payment-method-div')[0];
let totalPriceList = document.getElementsByClassName('total-price-div')[0]
let chooseCard = 0;

if(productListlength > 2) {
    showAllBtn.classList.add('visibility');
    listMore.classList.add('visibility');
}else{
    totalPriceList.style.marginTop = '13px';
}

function showAllList(){
    productList.classList.toggle("auto-height");
    listMore.classList.toggle("visibility");
    showAllIcon.classList.toggle('rotate')
}

chooseCardBtnList.forEach((value, index) => {
    console.log(value, index);
    value.addEventListener('click', () => changeMyCard(value, index));
});

function changeMyCard(value, index) {
    console.log(value, index);
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
