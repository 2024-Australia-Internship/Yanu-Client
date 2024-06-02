const urlParams = new URL(location.href).searchParams;
const order_info = urlParams.get('order_info');
const json_order_info = JSON.parse(order_info);
console.log(json_order_info);

window.onload = () => {
    getProducts();
}

async function getProducts() {
    try{
        const response = await axios.get(`${BASE_URL}/products/product/${json_order_info.productId}`, config)
        console.log(response.data)
        showProducts([response.data])
    }catch(error){  
        console.error(error);
    }
}

function showProducts(products){
    let orderProductList = document.getElementsByClassName('order-product-list')[0];
    let orderPrice = document.getElementsByClassName('order-price')[0];
    let totalPriceCnt = 0;

    products.forEach(product => {
        let orderProduct = document.createElement('div');
        orderProduct.className = 'order-product';

        let productInfo = document.createElement('div');
        productInfo.className = 'product-info';

        let productImg = document.createElement('img');
        productImg.className = 'product-img';
        productImg.src = '../images/product-img.png';

        let productDetail = document.createElement('div');
        productDetail.className = 'product-detail';

        let productTitle = document.createElement('div');
        productTitle.className = 'product-title';
        productTitle.innerText = product.title;
        
        let farmName = document.createElement('div');
        farmName.className = 'farm-name';
        farmName.innerText = product.business_name;

        let productPrice = document.createElement('div');
        productPrice.className = 'product-price';
        productPrice.innerText = `$ ${product.price} / ${product.unit} x ${json_order_info.quantity}`
    
        productDetail.appendChild(productTitle)
        productDetail.appendChild(farmName)
        productDetail.appendChild(productPrice)

        productInfo.appendChild(productImg)
        productInfo.appendChild(productDetail)

        let totalPrice = document.createElement('div');
        totalPrice.className = 'total-price';
        totalPrice.innerText = `$ ${product.price * json_order_info.quantity}`

        orderProduct.appendChild(productInfo)
        orderProduct.appendChild(totalPrice)

        orderProductList.appendChild(orderProduct)

        totalPriceCnt += product.price * json_order_info.quantity;
    });

    orderPrice.innerText = `$ ${totalPriceCnt}`
}

function moveMain() {
    window.location.href = './main-page.html'
}

function moveOrderHistory(){
    window.location.href = './order-history-page.html'
}