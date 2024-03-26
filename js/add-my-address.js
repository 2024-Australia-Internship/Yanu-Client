function applyNewAddress(){
    let name = document.getElementsByClassName('name-input')[0].value;
    let familyName = document.getElementsByClassName('family-name-input')[0].value;
    let phoneNumber = document.getElementsByClassName('phone-num-input')[0].value;
    let zipCode = document.getElementsByClassName('zip-code-input')[0].value;
    let address1 = document.getElementsByClassName('address-input1')[0].value;
    let address2 = document.getElementsByClassName('address-input2')[0].value;

    if(!name) return alert('이름을 입력해주세요')
    if(!familyName) return alert('이름을 입력해주세요')
    if(!((/^04\d{8}$/).test(phoneNumber) || (/^010\d{8}$/).test(phoneNumber))) 
        return alert('전화번호를 입력해주세요.');
    if(!(((/^\d{5}$/).test(zipCode)))) return alert('우편번호를 입력해주세요')
    if(!address1 || !address2) return alert('주소를 입력해주세요 입력해주세요')

    window.location.href = '/html/my-address-page.html';
}