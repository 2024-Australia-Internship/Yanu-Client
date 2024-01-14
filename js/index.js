function checkInfo(){
    alert('정보 확인');

    let idValue = document.getElementsByClassName('id-input')[0].value;
    let pwValue = document.getElementsByClassName('pw-input')[0].value;

    const req = {
        user_email: idValue,
        user_pw: pwValue
    }
    axios.post(`${BASE_URL}/users/login`, req)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}