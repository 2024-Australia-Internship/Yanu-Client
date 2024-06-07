
function getCookie(key){
    key = new RegExp(key + '=([^;]*)'); 
    return key.test(document.cookie) ? unescape(RegExp.$1) : '';
}

const config = {
    headers: {
        'Authorization': getCookie('token')
    },
};

function clickFavorites(id, type, name, element){
    const req = {
        [type]: {id: id}
    }

    if(element.icon === 'ph:heart-fill'){ // 찜 삭제
        deleteFavorites(req, element, name)
    }else{ // 찜 추가
        addFavorites(req, element, name)
    }
}

function moveProductPage(id, userId, farmId){
    window.location.href = `/html/product-page.html?product_code=${id}&user_code=${userId}&farm_code=${farmId}`
}

function addFavorites(req, element, name) {
    axios.post(`${BASE_URL}/favorites/${name}`, req, config)
    .then(res => {
        element.icon = 'ph:heart-fill';
    })
    .catch(error => {
        console.error(error);
    })
}

function deleteFavorites(req, element, name) {
    axios.delete(`${BASE_URL}/favorites/${name}`, {
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