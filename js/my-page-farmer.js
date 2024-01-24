const user_code = getCookie('user_code');
window.onload = () => {
    axios.get(`${BASE_URL}/users/${user_code}`)
    .then(response => {
        console.log(response);
        document.getElementsByClassName('user-name')[0].innerText = 
            response.data.userAllInfo[0].nickname;
        document.getElementsByClassName('user-farm-name')[0].innerText = 
            response.data.farmInfo.business_name;
        document.getElementsByClassName('profile-img')[0].src = 
            response.data.profile_image;
            console.log(response.data.profile_image);
        document.getElementsByClassName('farm-back-img')[0].src = 
            response.data.farm_image;
        document.getElementsByClassName('ugly-cnt')[0].innerText = 
            response.data.userAllInfo[0].user_ugly;
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}


function editbackImg(){
    document.getElementsByClassName('upload-file')[0].click();
}
let fileUpload = document.getElementsByClassName('upload-file')[0];

fileUpload.addEventListener('change', getImageFiles);

function getImageFiles(e){
    const file = e.currentTarget.files[0];
    console.log(file);
    let img = document.getElementsByClassName('farm-back-img')[0];

    if (!file.type.match("image/.*")) {
        alert('이미지 파일만 업로드가 가능합니다.');
        return;
    }

    const formData = new FormData();

    formData.append('farm_image', file);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    axios.post(`${BASE_URL}/farms/register/image/${user_code}`, formData, config)
    .then(response => {
        console.log(response);
        img.src = URL.createObjectURL(file); 
        alert('이미지 업로드 성공');
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        alert('이미지 업로드 실패');
    });
}