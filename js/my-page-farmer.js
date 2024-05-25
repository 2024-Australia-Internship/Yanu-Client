window.onload = () => {
    let name = document.getElementsByClassName('user-name')[0];
    let farm_name = document.getElementsByClassName('user-farm-name')[0];
    let profile_img = document.getElementsByClassName('profile-img')[0];
    let farm_img = document.getElementsByClassName('farm-back-img')[0];
    let uglyPercent = document.getElementsByClassName('ugly-cnt')[0];
    let uglyTomato = document.getElementsByClassName('ugly-tomato')[0];

    let profileImgSrc = JSON.parse(getCookie('userdata')).profile_image;

    axios.get(`${BASE_URL}/farms`, config)
    .then(response => {
        console.log(response);
        const { farmName, businessName, ugly_percent } = response.data;
        name.innerText = farmName;
        farm_name.innerText = businessName;
        profile_img.src = profileImgSrc;

        if(ugly_percent > 66){
            uglyTomato.src = '/images/ugly-tomato-big.svg'
        }else if(ugly_percent > 33){
            uglyTomato.src = '/images/ugly-tomato-middle.svg'
        }
        uglyPercent.innerText = ugly_percent;
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

    // axios.post(`${BASE_URL}/farms/register/image/${user_code}`, formData, config)
    // .then(response => {
    //     console.log(response);
    //     img.src = URL.createObjectURL(file); 
    //     alert('이미지 업로드 성공');
    // })
    // .catch(error => {
    //     console.error('There has been a problem with your axios request:', error);
    //     alert('이미지 업로드 실패');
    // });
}