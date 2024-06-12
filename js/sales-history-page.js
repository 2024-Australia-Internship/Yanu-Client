window.onload = () => {
    saleHistory();
}

async function saleHistory() {
    try{
        const response = await axios.get(`${BASE_URL}/sales`, config);
        console.log(response.data);

        let saleHistory = {};
        response.data.forEach(history => {
            const month = replaceMonthNumbers(history.saleDate.substr(5, 2));
            const day = history.saleDate.substr(8, 2);
            if(saleHistory[`${month} ${day}`]) {
                saleHistory[`${month} ${day}`].push(history);
            }else{
                saleHistory[`${month} ${day}`] = [history];
            }
        })

        console.log(saleHistory);
        showList(saleHistory);
    }catch(err){
        console.error(err);
    }
}

function replaceMonthNumbers(input) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
  
    return input.replace(/\b(0[1-9]|1[0-2])\b/g, (match) => {
        return monthNames[parseInt(match, 10) - 1];
    });
}

function showList(saleHistory) {
    console.log(saleHistory);
    const keys = Object.keys(saleHistory);
    keys.forEach(key => {
        let historyListDiv = document.getElementsByClassName('history-list-div')[0];
  
        let historyDate = document.createElement('div');
        historyDate.className = 'history-date';

        let title = document.createElement('div');
        title.className = 'title';
        title.innerText = key;

        let saleList = document.createElement('div');
        saleList.className = 'sale-list';

        historyDate.appendChild(title);
        historyDate.appendChild(saleList);

        historyListDiv.appendChild(historyDate);

        saleHistory[key].forEach(product => {
            console.log(product);
            let productBox = document.createElement('div');
            productBox.className = 'product-box';
    
            let productTitleBox = document.createElement('div');
            productTitleBox.className = 'product-title-box';
    
            let productTitle = document.createElement('div');
            productTitle.className = 'product-title';
    
            let deliveryStatus = document.createElement('div');
            deliveryStatus.className = 'delivery-status'
            deliveryStatus.innerText = 'Shipped';
    
            let productName = document.createElement('div');
            productName.className = 'product-name';
            productName.innerText = product.title;
    
            productTitle.appendChild(deliveryStatus)
            productTitle.appendChild(productName)
    
            let consumerName = document.createElement('div');
            consumerName.className = 'consumer-name';
            consumerName.innerText = product.buyerName;
    
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
            productPrice.innerText = `$ ${product.price}`;
    
            productDetailPrice.appendChild(priceTitle);
            productDetailPrice.appendChild(productPrice);
    
            let productDetailQty = document.createElement('div');
            productDetailQty.className = 'product-detail';
    
            let quantityTitle = document.createElement('div');
            quantityTitle.className = 'quantity-title';
            quantityTitle.innerText = 'Qty'
    
            let productQuantity = document.createElement('div');
            productQuantity.className = 'product-quantity';
            productQuantity.innerText = product.quantity;
    
            productDetailQty.appendChild(quantityTitle);
            productDetailQty.appendChild(productQuantity);
    
            productDetailBox.appendChild(productDetailPrice)
            productDetailBox.appendChild(productDetailQty)
    
            productBox.appendChild(productTitleBox)
            productBox.appendChild(productDetailBox)
    
            saleList.appendChild(productBox)
    
            
    
            
        })
    })
}