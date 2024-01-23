
function getCookie(key){
    key = new RegExp(key + '=([^;]*)'); 
    return key.test(document.cookie) ? unescape(RegExp.$1) : '';
}


function heartToggle(e){
    if(e.target.classList.contains('choose-heart-btn')){
        e.target.classList.remove('choose-heart-btn');
        e.target.icon = 'ph:heart';
    }else{
        e.target.classList.add('choose-heart-btn');
        e.target.icon = 'ph:heart-fill';
    }
}