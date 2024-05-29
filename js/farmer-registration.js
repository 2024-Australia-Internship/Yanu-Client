function termSelectAll(){
    let checkBtns = [...document.getElementsByClassName('terms-checkbox')];
    for(let checkBtn of checkBtns){
        checkBtn.checked = true
    }
}

async function submit(){
    let businessName = document.getElementsByClassName('business-name-input')[0].value;
    let name = document.getElementsByClassName('name-input')[0].value;
    let familyName = document.getElementsByClassName('family-name-input')[0].value;
    let phoneNumber = document.getElementsByClassName('phone-number-input')[0].value;
    let email = document.getElementsByClassName('e-mail-input')[0].value;
    let address1 = document.getElementsByClassName('address-input1')[0].value;
    let address2 = document.getElementsByClassName('address-input2')[0].value;

    if(businessName === '') return alert('Please input your business name');
    if(name === '') return alert('Please input your name');
    if(familyName === '') return alert('Please input your family name');
    if(phoneNumber === '') return alert('Please input your phone number');
    if(email === '') return alert('Please input your email');
    if(address1 === '') return alert('Please input your address');
    if(address2 === '') return alert('Please input your address');

    if(!(((/^04\d{8}$/).test(phoneNumber)) || ((/^010\d{8}$/).test(phoneNumber)))){
        return alert('Please re-enter your phone number')
    }

    if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(email)){
        return alert('Please re-enter your email');
    }

    let checkBtns = [...document.getElementsByClassName('terms-checkbox')];
    for(let checkBtn of checkBtns){
        if(!checkBtn.checked) return alert('Please agree to the Terms of Use')
    }

    const config = {
        headers: {
            'Content-type': 'application/json;charset=UTF-8',
            'Authorization': `KakaoAK ${window.env.KAKAO_MAP_REST_API}`
        }
    }

    let x;
    let y;

    const addressRes =  await axios.get(`https://dapi.kakao.com/v2/local/search/address?query=${address1}`, config)

    if(addressRes.data.documents.length === 0){
        return alert('Please enter your address again')
    }

    x = addressRes.data.documents[0].x;
    y = addressRes.data.documents[0].y;

    const reqE = {
        email: email
    }

    await axios.post(`${BASE_URL}/users/duplication/email`, reqE)
    .then(response => {
        return alert('This email doesn\'t exist');
    })
    .catch(error => {
        if(error.response.status === 400){
            register(businessName, familyName, name, phoneNumber, email, address1, address2, x, y);
        }else{
            console.error('There has been a problem with your axios request:', error);
        }
    });
}

function register(businessName, familyName, name, phoneNumber, email, address1, address2, x, y){
    const req = {
        business_name: businessName, 
        farm_name: `${familyName} ${name}`, 
        phonenumber: phoneNumber, 
        email: email,
        address: `${address1}, ${address2}`,
        latitude: x,
        longitude: y 
    }

    axios.post(`${BASE_URL}/farms`, req, config)
    .then(response => {
        console.log(response)
        window.location.href = '/html/main-page.html';
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}