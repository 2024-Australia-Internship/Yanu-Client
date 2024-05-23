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

async function checkInfo(){
    let idValue = document.getElementsByClassName('id-input')[0].value;
    let pwValue = document.getElementsByClassName('my-pw-input')[0].value;

    const req = {
        email: idValue,
        password: pwValue
    }
    
    let expireDate = new Date();
    expireDate.setMonth(expireDate.getMonth() + 1); // 한 달동안 저장

    await axios.post(`${BASE_URL}/users/login`, req)
    .then((res) => {
        document.cookie = `token=Bearer ${res.data.token}; path=/; expires=${expireDate};`; 
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        alert(error.response.data.message);
    });

    console.log(config);
    await axios.get(`${BASE_URL}/users`, config)
    .then(response => {
        console.log(response);
    
        const { is_farmer, nickname, profile_image, ugly_percent } = response.data;

        const data = {
            is_farmer: is_farmer,
            nickname: nickname,
            profile_image: profile_image,
            ugly_percent: ugly_percent
        }

        const jsonData = JSON.stringify(data);

        document.cookie = `userdata=${jsonData}; path=/; expires=${expireDate};`; 
    
        window.location.href = '/html/main-page.html';
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}