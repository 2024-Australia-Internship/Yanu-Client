
function getCookie(key){
    key = new RegExp(key + '=([^;]*)'); 
    return key.test(document.cookie) ? unescape(RegExp.$1) : '';
}
