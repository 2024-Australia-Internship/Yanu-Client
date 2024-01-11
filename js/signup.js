function showMyPw(){
    let myPw = document.getElementsByClassName('my-pw-input')[0];
    let toggleBtn = document.getElementsByClassName('my-pw-icon')[0];
    togglePw(myPw, toggleBtn);
}

function showConfirmPw(){
    let myPw = document.getElementsByClassName('confirm-pw-input')[0];
    let toggleBtn = document.getElementsByClassName('confirm-pw-icon')[0];
    togglePw(myPw, toggleBtn);
}

function togglePw(myPw, toggleBtn){
    if(myPw.type === "password"){
        myPw.type = "text";
        toggleBtn.icon = "ph:eye-closed-light";
    }else{
        myPw.type = "password";
        toggleBtn.icon = "ph:eye-light";
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
    let secondPw = document.getElementsByClassName('confirm-pw-input')[0];

    if(firstPw.value !== secondPw.value){
        secondPw.classList.add('wrong-info');
    }else{
        secondPw.classList.remove('wrong-info');
    }
}

function signup(){
    let user_emailC = document.getElementsByClassName('email-input')[0].value;
    let user_pwC = document.getElementsByClassName('my-pw-input')[0].value;
    let user_phonenumberC = 
    `${document.getElementsByClassName('select-country-div')[0].value} ${document.getElementsByClassName('phone-num-input')[0].value}`;

    console.log(user_emailC);
    console.log(user_pwC);
    console.log(user_phonenumberC);
    const req = {
        user_email: user_emailC,
        user_pw: user_pwC, 
        user_phonenumber: user_phonenumberC
    }
    axios.post(`${BASE_URL}/users/register`, req)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}