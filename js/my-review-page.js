let index = -1;
let editBtns = [...document.getElementsByClassName('edit-btn')];
editBtns.forEach((e, i) => {
    e.onclick = () => showEditDiv(e, i);
})

document.addEventListener('click', (e) => {
    let editDiv = document.getElementsByClassName('edit-post-div')[0];
    if(e.target.className != "edit-btn"){
        editDiv.style.visibility = "hidden";
    }

});

function showEditDiv(e, i){
    console.log(e, i);
    let editDiv = document.getElementsByClassName('edit-post-div')[0];
    if(index != i){
        let buttonRect = e.getBoundingClientRect();
        let buttonX = buttonRect.left + window.pageXOffset;
        let buttonY = buttonRect.top + window.pageYOffset;
        editDiv.style.visibility = "visible";
        editDiv.style.top = `${buttonY + 24}px`;
        editDiv.style.left =`${buttonX - 70}px`;
        index = i;
    }else{
        editDiv.style.visibility = "hidden";
        index = -1;
    }

    let editButton = document.getElementsByClassName('edit-post')[0];
    let deleteButton = document.getElementsByClassName('delete-post')[0];
    editButton.onclick = () => editMyPost(i);
    deleteButton.onclick = () => deleteMyPost(i);
}

function editMyPost(i){
    window.location.href = '../html/edit-my-review.html';
    
}
function deleteMyPost(i){

}