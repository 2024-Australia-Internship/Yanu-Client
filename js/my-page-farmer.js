let farm_id;

window.onload = async () => {
    let name = document.getElementsByClassName('user-name')[0];
    let farm_name = document.getElementsByClassName('user-farm-name')[0];
    let profile_img = document.getElementsByClassName('profile-img')[0];
    let farm_img = document.getElementsByClassName('farm-back-img')[0];
    let uglyPercent = document.getElementsByClassName('ugly-cnt')[0];
    let uglyTomato = document.getElementsByClassName('ugly-tomato')[0];
    let user_id = JSON.parse(getCookie('userdata')).id;
    console.log(user_id)

    try{
        const farmInfo = await axios.get(`${BASE_URL}/farms`, config);
        const { farmName, businessName, farmId, profile, farmProfile } = farmInfo.data;
    
        farm_id = farmId;
        name.innerText = farmName;
        farm_name.innerText = businessName;
        profile_img.src = `${IMAGE_URL}${profile}`;
        farm_img.src = farmProfile ? `${IMAGE_URL}${farmProfile}` : '/images/farmer-registration-back-img.svg';

        const uglyResponse = await axios.get(`${BASE_URL}/farms/${user_id}/uglypercent`, config);
        const ugly_percent = uglyResponse.data.uglypercent;

        if(ugly_percent > 66){
            uglyTomato.src = '/images/ugly-tomato-big.svg'
        }else if(ugly_percent > 33){
            uglyTomato.src = '/images/ugly-tomato-middle.svg'
        }
        uglyPercent.innerText = ugly_percent;
    }catch(err){
        console.error(err);
    }
}

function clickMyProduct(){
    window.location.href=`./my-product.html?id=${farm_id}`
}

function editbackImg(){
    document.getElementsByClassName('upload-file')[0].click();
}

let fileUpload = document.getElementsByClassName('upload-file')[0];

fileUpload.addEventListener('change', getImageFiles);

async function getImageFiles(e){
    const file = e.currentTarget.files[0];
    console.log(file);
    let img = document.getElementsByClassName('farm-back-img')[0];

    if (!file.type.match("image/.*")) {
        alert('이미지 파일만 업로드가 가능합니다.');
        return;
    }

    const formData = new FormData();
    formData.append('profile', file);

    try{
        const response = await axios.post(`${BASE_URL}/farms/image`, formData, config);
        img.src = URL.createObjectURL(file); 
        console.log(response);
    }catch(err){
        console.error(err);
    }
}