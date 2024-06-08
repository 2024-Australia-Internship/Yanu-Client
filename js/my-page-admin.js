const userName = document.getElementsByClassName('user-name')[0];
const profileImg = document.getElementsByClassName('profile-img')[0];
const uglyPercent = document.getElementsByClassName('ugly-cnt')[0];
const uglyTomato = document.getElementsByClassName('ugly-tomato')[0];

window.onload = () => {
    const { id, nickname, profile_image } = JSON.parse(getCookie('userdata'));
    
    userName.innerText = nickname;
    profileImg.src = profile_image;
    // uglyPercent.innerText = ugly_percent;

    if(ugly_percent > 66){
        uglyTomato.src = '/images/ugly-tomato-big.svg'
    }else if(ugly_percent > 33){
        uglyTomato.src = '/images/ugly-tomato-middle.svg'
    }
    uglyPercent.innerText = ugly_percent;
}  