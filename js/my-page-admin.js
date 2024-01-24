let user_code = getCookie('user_code'); 
window.onload = () => {
    axios.get(`${BASE_URL}/users/${user_code}`)
    .then(response => {
        console.log(response);
        document.getElementsByClassName('user-name')[0].innerText = 
            response.data.userAllInfo[0].nickname;
        document.getElementsByClassName('profile-img')[0].src = 
            response.data.userAllInfo[0].profile_image;
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}  