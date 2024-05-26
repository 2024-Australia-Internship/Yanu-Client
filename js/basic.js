
function getCookie(key){
    key = new RegExp(key + '=([^;]*)'); 
    return key.test(document.cookie) ? unescape(RegExp.$1) : '';
}

const config = {
    headers: {
        'Authorization': getCookie('token')
    },
};

function clickFavorites(id, type, element){
    const req = {
        productId: {id: id},
        type: type
    }

    if(element.icon === 'ph:heart-fill'){ // 찜 삭제
        deleteFavorites(req, element)
    }else{ // 찜 추가
        addFavorites(req, element)
    }
}

function moveProductPage(id, userId, farmId){
    window.location.href = `/html/product-page.html?product_code=${id}&user_code=${userId}&farm_code=${farmId}`
}

function addFavorites(req, element) {
    axios.post(`${BASE_URL}/favorites`, req, config)
    .then(res => {
        element.icon = 'ph:heart-fill';
    })
    .catch(error => {
        console.error(error);
    })
}

function deleteFavorites(req, element) {
    axios.delete(`${BASE_URL}/favorites`, {
        data: req,
        ...config
    })
    .then(res => {
        element.icon = 'ph:heart';
    })
    .catch(error => {
        console.error(error);
    })
}