function termSelectAll(){
    let checkBtns = [...document.getElementsByClassName('terms-checkbox')];
    for(let checkBtn of checkBtns){
        checkBtn.checked = true
    }
}

function submit(){
    let businessName = document.getElementsByClassName('business-name-input')[0].value;
    let name = document.getElementsByClassName('name-input')[0].value;
    let familyName = document.getElementsByClassName('family-name-input')[1].value;
    let phoneNumber = document.getElementsByClassName('phone-number-input')[0].value;
    let email = document.getElementsByClassName('e-mail-input')[0].value;
    let adress1 = document.getElementsByClassName('address-input1')[0].value;
    let adress2 = document.getElementsByClassName('address-input2')[0].value;

    if(businessName === '') return alert('businessName null');
    if(name === '') return alert('name null');
    if(familyName === '') return alert('familyName null');
    if(phoneNumber === '') return alert('phoneNumber null');
    if(email === '') return alert('email null');
    if(adress1 === '') return alert('adress1 null');
    if(adress2 === '') return alert('adress2 null');

    if(!(((/^04\d{8}$/).test(phoneNumber)) || ((/^010\d{8}$/).test(phoneNumber)))){
        return alert('전화번호 제대로 입력하셈')
    }

    if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(email)){
        return alert('이메일 다시 입력하셈');
    }

    const reqE = {
        user_email: email
    }
    axios.post(`${BASE_URL}/users/check/email`, reqE)
    .then(response => {
        console.log(response)
        return alert('존재하지 않는 이메일입니다.');
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        let checkBtns = [...document.getElementsByClassName('terms-checkbox')];
        for(let checkBtn of checkBtns){
            if(!checkBtn.checked) return alert('terms 동의 please')
        }

        let user_code = getCookie('user_code');

        console.log(user_code);
        console.log(businessName);
        console.log(`${familyName} ${name}`);
        console.log(phoneNumber);
        console.log(email);
        console.log(`${adress1} ${adress2}`);

        const req = {
            user_code: user_code, 
            business_name: businessName, 
            farmer_name: `${familyName} ${name}`, 
            farm_phonenumber: phoneNumber, 
            farm_email: email, 
            farm_address: `${adress1} ${adress2}`
        }
        axios.post(`${BASE_URL}/farms/register`, req)
        .then(response => {
            console.log(response)
            window.location.href = '/html/main-page.html';
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
        
    });

    
}