function applyNewCard(){
    const cardNum = document.getElementsByClassName('card-num')[0].value;
    const cardHolder = document.getElementsByClassName('card-holder')[0].value;
    const expirationDate = document.getElementsByClassName('expiration-date')[0].value;
    const cvcCode = document.getElementsByClassName('cvc-code')[0].value;

    if(!(/^\d{16}$/.test(cardNum))){
        return alert('Please enter your card number')
    }

    if(!cardHolder){
        return alert('Please enter your card holder');
    }

    if(!(/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate))){
        return alert('Please enter expiration date');
    }

    if(!(/^\d{3}$/.test(cvcCode))){
        return alert('Please enter CVC Code');
    }

    window.location.href = './payment-method-page.html'
}