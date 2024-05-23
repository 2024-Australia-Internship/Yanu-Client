let choosePage = document.getElementById('choose-page');
let choosePageName = choosePage.firstElementChild.classList[1];
choosePage.firstElementChild.innerHTML = `<img src="/images/${choosePageName}-hover.svg">`;
function isFarmer(){
    let isFarmer = JSON.parse(getCookie('userdata')).is_farmer
    if(isFarmer){
        window.location.href = '/html/my-page-farmer.html'
    }else{
        window.location.href = '/html/my-page-farmer.html';
    }
}