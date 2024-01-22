function editbackImg(){
    document.getElementsByClassName('upload-file')[0].click();
}
let fileUpload = document.getElementsByClassName('upload-file')[0];

fileUpload.addEventListener('change', getImageFiles);

function getImageFiles(e){
    const file = e.currentTarget.files[0];
    console.log(file);

    if (!file.type.match("image/.*")) {
        alert('이미지 파일만 업로드가 가능합니다.');
        return;
    }

    let backImg = document.getElementsByClassName('farm-back-img')[0];
    backImg.src = URL.createObjectURL(file); 
}