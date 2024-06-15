const userName = document.getElementsByClassName('user-name')[0];
const profileImg = document.getElementsByClassName('profile-img')[0];
const uglyPercent = document.getElementsByClassName('ugly-cnt')[0];
const uglyTomato = document.getElementsByClassName('ugly-tomato')[0];

window.onload = () => {
    const { id, nickname, profile_image } = JSON.parse(getCookie('userdata'));
    profileImg.src = `${IMAGE_URL}${profile_image}`
    userName.innerText = nickname;
}  