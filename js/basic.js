
function getCookie(key){
    key = new RegExp(key + '=([^;]*)'); 
    return key.test(document.cookie) ? unescape(RegExp.$1) : '';
}

const config = {
    headers: {
        'Authorization': getCookie('token')
    },
};


function heartToggle(e){
    console.log(e.target.parentNode.parentNode.parentNode.id);
    let product_code = e.target.parentNode.parentNode.parentNode.id;
    console.log(e.target.parentNode.parentNode.parentNode.classList[1]);
    let user_code = e.target.parentNode.parentNode.parentNode.classList[1];
    console.log(!e.target.classList.contains('product-btn'));
    let product_category = !e.target.classList.contains('product-btn');

    if(e.target.classList.contains('choose-heart-btn')){
        axios.delete(`${BASE_URL}/hearts/${user_code}/${product_code}`)
        .then(response => {
            console.log(response);
            e.target.classList.remove('choose-heart-btn');
            e.target.icon = 'ph:heart';
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
    }else{
        const req = {
            user_code: user_code,
            product_category: product_category
        }
        axios.post(`${BASE_URL}/hearts/${product_code}`, req)
        .then(response => {
            console.log(response);
            e.target.classList.add('choose-heart-btn');
            e.target.icon = 'ph:heart-fill';
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
    }
}