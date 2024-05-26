function applyNewAddress(){
    let name = document.getElementsByClassName('name-input')[0].value;
    let familyName = document.getElementsByClassName('family-name-input')[0].value;
    let phoneNumber = document.getElementsByClassName('phone-num-input')[0].value;
    let zipCode = document.getElementsByClassName('zip-code-input')[0].value;
    let address1 = document.getElementsByClassName('address-input1')[0].value;
    let address2 = document.getElementsByClassName('address-input2')[0].value;

    if(!name) return alert('Please enter your name')
    if(!familyName) return alert('Please enter your name')
    if(!((/^04\d{8}$/).test(phoneNumber) || (/^010\d{8}$/).test(phoneNumber))) 
        return alert('Please enter your phone number');
    if(!(((/^\d{5}$/).test(zipCode)))) return alert('Please enter your zip code')
    if(!address1 || !address2) return alert('Please enter your address')

    window.location.href = '/html/my-address-page.html';
}