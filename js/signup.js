const label = document.querySelector('.label');
const countryNum = document.getElementsByClassName('select-country-num')[0];
const options = document.querySelectorAll('.optionItem');
const handleSelect = function(item) {
    console.log(item.textContent)
    countryNum.innerHTML = item.textContent.substr(3, 4);
    label.parentNode.classList.remove('active');
    label.style.boxShadow = 'none';
}
options.forEach(function(option){
    option.addEventListener('click', function(){handleSelect(option)})
})

label.addEventListener('click', function(){
    if(label.parentNode.classList.contains('active')) {
        label.parentNode.classList.remove('active');
        label.style.boxShadow = 'none';
    } else {
        label.parentNode.classList.add('active');
        label.style.boxShadow = '0 1px 4px 0 rgba(0, 0, 0, 0.12)';
    }
});

function checkEmail(flag){
    let myEmail = document.getElementsByClassName('email-input')[0].value;

    let checkEmail = document.getElementsByClassName('email-comment')[0];

    axios.post(`${BASE_URL}/users/duplication/${myEmail}`)
    .then(response => {
        console.log("성ㅅ공성공");
        console.log(response);
        if((/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(myEmail)){
            checkEmail.innerText = "You can use this E-mail."
            checkEmail.style.color = "#66CC00";
        }
        if(flag) signup();
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        console.log(error.response.status);
        if(error.response.status == 409){
            checkEmail.innerText = "Someone is already using this E-mail."
            checkEmail.style.color = "#FF6F6F"; 
        }
        if(flag) alert('이메일을 확인해주세요');
    });
}

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
    let user_country_num = document.getElementsByClassName('label')[0].innerText;
    let user_phonenumber = document.getElementsByClassName('phone-num-input')[0].value;
    let user_confirm_pw = document.getElementsByClassName('confirm-pw-input')[0].value;

    console.log(user_email);
    console.log(user_pw);
    console.log(user_phonenumber);

    // pw 확인 - myPw와 confirmPw가 같은지
    if(user_pw !== user_confirm_pw) return alert('비번 틀림');

    // pw 확인 - 조건에 충족하는지
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*+=-]).{8,16}$/).test(user_confirm_pw)){
        return alert('비번 조건에 안 맞음');
    }

    // phone number 확인
    console.log(user_country_num);
    if(!((user_country_num == '+ 61' && (/^04\d{8}$/).test(user_phonenumber)) ||
       (user_country_num == '+ 82' && (/^010\d{8}$/).test(user_phonenumber)))){
        return alert('전화번호 틀림');
    }

    user_phonenumber = `${user_country_num} ${user_phonenumber}`

    const req = {
        email: user_email,
        password: user_pw, 
        phonenumber: user_phonenumber
    }
    axios.post(`${BASE_URL}/users`, req)
    .then(response => {
        console.log(response)
        let user_code = response.data.result.user_code;
        console.log(user_code);
        window.localStorage.setItem('first-login', true);
        window.location.href = `/html/setting-profile.html?user_code=${user_code}`;
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}
