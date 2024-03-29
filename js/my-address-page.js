function addAddress(){
    window.location.href = '../html/add-my-address.html';
}

function deleteAddres(){
    let basicComponent = [...document.getElementsByClassName('basic-component')];
    let deleteComponent = [...document.getElementsByClassName('delete-component')];

    basicComponent.forEach(component => {
        component.classList.toggle('hide-component');
    })

    deleteComponent.forEach(component => {
        component.classList.toggle('hide-component');
    })
}

let deleteBtns = [...document.getElementsByClassName('delete-check-btn')];
deleteBtns.forEach(btn => {
    btn.onclick = () => deleteCheck(btn);
})

function deleteCheck(btn){
    btn.classList.toggle('checked-delete-btn');
}

let mainAddress = [...document.getElementsByClassName('my-address-box')];
mainAddress.forEach(address => {
    address.onclick = () => selectMainAddress(mainAddress, address);
})

function selectMainAddress(addressList, address) {
    let currectNode = address.childNodes[3].childNodes[1].childNodes[3];
    addressList.forEach(address => {
        let currectNode = address.childNodes[3].childNodes[1].childNodes[3];
        currectNode.classList.add('hide-component');
    })
    currectNode.classList.remove('hide-component');
    currectNode.classList.add('choose-address');
}