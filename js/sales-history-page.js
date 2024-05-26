window.onload = () => {
    showList();
}

function showList() {
    let historyListDiv = document.getElementsByClassName('history-list-div')[0];
  
    let historyDate = document.createElement('div');
    historyDate.className = 'history-date';

    let title = document.createElement('div');
    title.className = 'title';
    title.innerText = 'Jun 10';

    let saleList = document.createElement('div');
    saleList.className = 'sale-list';

    let productBox = document.createElement('div');
    productBox.className = 'product-box';

    let productTitleBox = document.createElement('div');
    productTitleBox.className = 'product-title-box';

    let productTitle = document.createElement('div');
    productTitle.className = 'product-title';

    let deliveryStatus = document.createElement('div');
    deliveryStatus.className = 'delivery-status'
    deliveryStatus.innerText = 'Preparing';

    let productName = document.createElement('div');
    productName.className = 'product-name';
    productName.innerText = '[Annie] SWEET CARROT VERY VERY GOOD GOOD'

    productTitle.appendChild(deliveryStatus)
    productTitle.appendChild(productName)

    let consumerName = document.createElement('div');
    consumerName.className = 'consumer-name';
    consumerName.innerText = 'Hannah';

    productTitleBox.appendChild(productTitle)
    productTitleBox.appendChild(consumerName)

    let productDetailBox = document.createElement('div');
    productDetailBox.className = 'product-detail-box';

    let productDetailPrice = document.createElement('div');
    productDetailPrice.className = 'product-detail';

    let priceTitle = document.createElement('div');
    priceTitle.className = 'price-title';
    priceTitle.innerText = 'price'

    let productPrice = document.createElement('div');
    productPrice.className = 'product-price';
    productPrice.innerText = '$ 12';

    productDetailPrice.appendChild(priceTitle);
    productDetailPrice.appendChild(productPrice);

    let productDetailQty = document.createElement('div');
    productDetailQty.className = 'product-detail';

    let quantityTitle = document.createElement('div');
    quantityTitle.className = 'quantity-title';
    quantityTitle.innerText = 'Qty'

    let productQuantity = document.createElement('div');
    productQuantity.className = 'product-quantity';
    productQuantity.innerText = '2';

    productDetailQty.appendChild(quantityTitle);
    productDetailQty.appendChild(productQuantity);

    productDetailBox.appendChild(productDetailPrice)
    productDetailBox.appendChild(productDetailQty)

    productBox.appendChild(productTitleBox)
    productBox.appendChild(productDetailBox)

    saleList.appendChild(productBox)

    historyDate.appendChild(title);
    historyDate.appendChild(saleList);

    historyListDiv.appendChild(historyDate);
}