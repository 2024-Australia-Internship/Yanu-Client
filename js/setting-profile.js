function editProfile(){
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

    let parent = document.getElementsByClassName('profile-img')[0];
    let img = document.createElement('img');
    img.setAttribute("class", 'img');

    img.src = URL.createObjectURL(file); 
    parent.replaceChildren(img);
}

function settingProfile(){
    const formData = new FormData();

    let file = document.getElementsByClassName('upload-file')[0].files[0];
    console.log(file);

    formData.append('profile_image', file);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    let nickname = document.getElementsByClassName('nickname-input')[0].value;
    let introduction = document.getElementsByClassName('introduction-input')[0].value;

    if(nickname == '') return alert('input your nickname');
    if(introduction == '') return alert('input your introduction');

    axios.post(`${BASE_URL}/users/profile`, formData, config)
    .then(response => {
        console.log(response);
        alert('이미지 업로드 성공');
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        alert('이미지 업로드 실패');
    });

}