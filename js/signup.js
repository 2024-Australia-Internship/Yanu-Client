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

function showConfirmPw(){
    let myPw = document.getElementsByClassName('confirm-pw-input')[0];
    let toggleBtn = document.getElementsByClassName('eye-div')[1];

    if(myPw.type === "password"){
        myPw.type = "text";
        toggleBtn.innerHTML = `<iconify-icon icon="ph:eye-closed-light" class="my-pw-icon confirm-pw-icon" onclick="showConfirmPw()"></iconify-icon>`
    }else{
        myPw.type = "password";
        toggleBtn.innerHTML = `<img src="/images/eye-open.svg" class="my-pw-icon confirm-pw-icon" onclick="showConfirmPw()">`;
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
    let user_email = document.getElementsByClassName('email-input')[0].value;
    let user_pw = document.getElementsByClassName('my-pw-input')[0].value;
    let user_country_num = document.getElementsByClassName('select-country-div')[0].value;
    let user_phonenumber = document.getElementsByClassName('phone-num-input')[0].value;
    let user_confirm_pw = document.getElementsByClassName('confirm-pw-input')[0].value;

    console.log(user_email);
    console.log(user_pw);
    console.log(user_phonenumber);

    // email 확인
    // if()

    // pw 확인 - myPw와 confirmPw가 같은지
    if(user_pw !== user_confirm_pw) return alert('비번 틀림');

    // pw 확인 - 조건에 충족하는지
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*+=-]).{8,16}$/).test(user_confirm_pw)){
        return alert('비번 조건에 안 맞음');
    }

    // phone number 확인
    console.log(user_country_num);
    if(!((user_country_num == '+61' && (/^04\d{8}$/).test(user_phonenumber)) ||
       (user_country_num == '+82' && (/^010\d{8}$/).test(user_phonenumber)))){
        return alert('전화번호 틀림');
    }

    user_phonenumber = `${user_country_num} ${user_phonenumber}`

    const req = {
        user_email: user_email,
        user_pw: user_pw, 
        user_phonenumber: user_phonenumber
    }
    axios.post(`${BASE_URL}/users/register`, req)
    .then(response => {
        console.log(response)
        if(response.data.message === ''){
            alert('아이디 중복');
        }
        console.log()
        // window.location.href = "/index.html";
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function selectedValue(){
    let selectBox = document.getElementsByClassName('select-country-div')[0];
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;

    console.log(selectBox.value + "before");
    selectBox.value = selectedValue;
    console.log(selectBox.value + "after");
}