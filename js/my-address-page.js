const deleteBtn = document.getElementsByClassName('delete-component')[0];

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

function deleteCheck(event){
    event.target.classList.toggle('checked-delete-btn');
}

