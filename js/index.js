function showMyPw(){
    let myPw = document.getElementsByClassName('my-pw-input')[0];
    let toggleBtn = document.getElementsByClassName('eye-div')[0];

    if(myPw.type === "password"){
        myPw.type = "text";
        toggleBtn.innerHTML = `<iconify-icon icon="ph:eye-closed-light" class="my-pw-icon pw-icon" onclick="showMyPw()"></iconify-icon>`
    }else{
        myPw.type = "password";
        toggleBtn.innerHTML = `<img src="/images/eye-open.svg" class="my-pw-icon pw-icon" onclick="showMyPw()">`;
    }
}

function checkInfo(){

    let idValue = document.getElementsByClassName('id-input')[0].value;
    let pwValue = document.getElementsByClassName('my-pw-input')[0].value;
    const req = {
        email: idValue,
        password: pwValue
    }
    
    axios.post(`${BASE_URL}/users/login`, req)
    .then(() => {
        window.location.href = '/html/main-page.html'
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        alert(error.response.data.message);
    });
}