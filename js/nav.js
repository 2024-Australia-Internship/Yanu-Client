let choosePage = document.getElementById('choose-page');
let choosePageName = choosePage.firstElementChild.classList[1];
choosePage.firstElementChild.innerHTML = `<img src="/images/${choosePageName}-hover.svg">`;

function isFarmer(){
    let user_code = getCookie('user_code');

    axios.get(`${BASE_URL}/users/${user_code}`)
    .then(response => {
        if(response.data.userAllInfo[0].is_farmer){
            window.location.href = '/html/my-page-farmer.html'
        }else{
            window.location.href = '/html/my-page-farmer.html';
        }
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}