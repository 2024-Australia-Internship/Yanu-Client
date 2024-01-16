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
    alert('정보 확인');

    let idValue = document.getElementsByClassName('id-input')[0].value;
    let pwValue = document.getElementsByClassName('my-pw-input')[0].value;

    console.log(pwValue);

    const req = {
        user_email: idValue,
        user_pw: pwValue
    }
    
    axios.post(`${BASE_URL}/users/login`, req)
    .then(response => {
        console.log(response);
        alert('로그인 성공');
        window.location.href = "/html/main-page.html";
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        alert('로그인 실패');
        if(error.response.status == 404) alert('비밀번호가 일치하지 않음');
    });
}