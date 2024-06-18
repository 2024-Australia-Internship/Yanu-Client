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

    try{
        // 로그인
        const login = await axios.post(`${BASE_URL}/users/login`, req)
        document.cookie = `token=Bearer ${login.data.token}; path=/; expires=${expireDate}; secure`; 

        // 헤더 가져오기
        let value = document.cookie.match('(^|;) ?' + 'token' + '=([^;]*)(;|$)');
        const token = value? value[2] : null;

        console.log(login);
        console.log(token);

        const config =  {
            headers: {
                'Authorization': `Bearer ${login.data.token}`
            },
        };

        console.log(config)

        // 유저 정보 저장
        const getInfo = await axios.get(`${BASE_URL}/users`, config)
        const { id, is_farmer, nickname, profile } = getInfo.data;

        const data = {
            id: id,
            is_farmer: is_farmer,
            nickname: nickname,
            profile_image: profile,
        }

        const jsonData = JSON.stringify(data);

        document.cookie = `userdata=${jsonData}; path=/; expires=${expireDate}; secure`; 
        localStorage.setItem('firstLogin', 1);
        window.location.href = '/html/main-page.html';
    }catch(error){
        console.error('There has been a problem with your axios request:', error);
        console.log(error.response.status)
        if(error.response.status == '404'){
            if(error.response.data.message === '비밀번호가 일치하지 않습니다'){
                return alert('Passwords do not match')
            }
    
            if(error.response.data.message === "등록된 이메일이 아닙니다"){
                return alert('This is not a registered email')
            }
        }
    }
}