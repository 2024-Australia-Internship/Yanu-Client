function showMyPw(){
    let myPw = document.getElementsByClassName('my-pw-input')[0];
    let toggleBtn = document.getElementsByClassName('eye-div')[0];

    if(myPw.type === "password"){
        myPw.type = "text";
        toggleBtn.innerHTML = `<iconify-icon icon="ph:eye-closed-light" class="pw-icon pw-icon" onclick="showMyPw()"></iconify-icon>`
    }else{
        myPw.type = "password";
        toggleBtn.innerHTML = `<img src="/images/eye-open.svg" class="pw-icon pw-icon" onclick="showMyPw()">`;
    }
}

function showConfirmPw(){
    let myPw = document.getElementsByClassName('check-new-pw-input')[0];
    let toggleBtn = document.getElementsByClassName('eye-div')[1];

    if(myPw.type === "password"){
        myPw.type = "text";
        toggleBtn.innerHTML = `<iconify-icon icon="ph:eye-closed-light" class="pw-icon confirm-pw-icon" onclick="showConfirmPw()"></iconify-icon>`
    }else{
        myPw.type = "password";
        toggleBtn.innerHTML = `<img src="/images/eye-open.svg" class="pw-icon confirm-pw-icon" onclick="showConfirmPw()">`;
    }
}

function checkPwCondition(){
    let pwValue = document.getElementsByClassName('my-pw-input')[0].value;

    // 8~16 letters
    if((/^.{8,16}$/).test(pwValue)){
        succeedPw(0);
    }else{
        failPw(0);
    }

    // Capital letter
    if((/[A-Z]/).test(pwValue)){
        succeedPw(1);
    }else{
        failPw(1);
    }

    // Small letter
    if((/[a-z]/).test(pwValue)){
        succeedPw(2);
    }else{
        failPw(2);
    }

    // Number
    if((/\d/).test(pwValue)){
        succeedPw(3);
    }else{
        failPw(3);
    }

    // Special character
    if(/[!@#$%^*+=-]/.test(pwValue)){
        succeedPw(4);
    }else{
        failPw(4);
    }

    checkPwEquivalence();
}

function succeedPw(num){
    document.getElementsByClassName('confirm-btn')[num].classList.add('currect-box');
    document.getElementsByClassName('check-icon')[num].classList.add('currect');
    document.getElementsByClassName('confirm-detail')[num].classList.add('currect');
}

function failPw(num){
    document.getElementsByClassName('confirm-btn')[num].classList.remove('currect-box');
    document.getElementsByClassName('check-icon')[num].classList.remove('currect');
    document.getElementsByClassName('confirm-detail')[num].classList.remove('currect');
}

function checkPwEquivalence(){
    let firstPw = document.getElementsByClassName('my-pw-input')[0];
    let secondPw = document.getElementsByClassName('check-new-pw-input')[0];

    if(firstPw.value != secondPw.value) {
        secondPw.classList.add('wrong-info');
    }else{
        secondPw.classList.remove('wrong-info');
    }
}

function checkEmail(){
    let myEmail = document.getElementsByClassName('email-input')[0].value;

    const req = {
        user_email: myEmail
    }
    axios.post(`${BASE_URL}/users/check/email`, req)
    .then(response => {
        alert('존재하지 않는 이메일 입니다.')
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        checkPw();
    });
}

function checkPw(){
    let user_email = document.getElementsByClassName('email-input')[0].value;
    let user_pw = document.getElementsByClassName('my-pw-input')[0].value;
    let user_confirm_pw = document.getElementsByClassName('check-new-pw-input')[0].value;

    // pw 확인 - myPw와 confirmPw가 같은지
    if(user_pw !== user_confirm_pw) return alert('비번 틀림');

    // pw 확인 - 조건에 충족하는지
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*+=-]).{8,16}$/).test(user_confirm_pw)){
        return alert('비번 조건에 안 맞음');
    }

    var req = {
        user_email: user_email,
        user_pw: user_pw
    }
    
    axios.patch(`${BASE_URL}/forget/password`, req)
    .then(response => {
        console.log(response);
        alert('로그인 성공');
        window.location.href = "/index.html";
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        alert('로그인 실패');
    });
}
