function editProfile(){
    document.getElementsByClassName('upload-file')[0].click();
}

let fileUpload = document.getElementsByClassName('upload-file')[0];

fileUpload.addEventListener('change', getImageFiles);

function getImageFiles(e){
    const file = e.currentTarget.files[0];

    if (!file.type.match("image/.*")) {
        alert('이미지 파일만 업로드가 가능합니다.');
        return;
    }

    let parent = document.getElementsByClassName('profile-img')[0];
    let img = document.createElement('img');
    img.setAttribute("class", 'img');

    img.src = URL.createObjectURL(file); 
    parent.replaceChildren(img);
}