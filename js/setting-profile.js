function editProfile(){
    document.getElementsByClassName('upload-file')[0].click();
}

let fileUpload = document.getElementsByClassName('upload-file')[0];

fileUpload.addEventListener('change', getImageFiles);

function getImageFiles(e){
    const file = e.currentTarget.files[0];
    console.log(file);

    if (!file.type.match("image/.*")) {
        alert('Only image files can be uploaded');
        return;
    }

    let parent = document.getElementsByClassName('profile-img')[0];
    let img = document.createElement('img');
    img.setAttribute("class", 'img');

    img.src = URL.createObjectURL(file); 
    parent.replaceChildren(img);
}

async function settingProfile(){
    let urlParams = new URL(location.href).searchParams;
    let email = urlParams.get('email');

    let file = document.getElementsByClassName('upload-file')[0].files[0];

    let nickname = document.getElementsByClassName('nickname-input')[0].value;
    if(nickname == '') return alert('input your nickname');

    const formData = new FormData();
    formData.append('profile', file);
    formData.append('email', email);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    await axios.post(`${BASE_URL}/users/profile/img`, formData, config)
    .then(response => {
        window.location.href = '/index.html';
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
        alert('Image upload failed');
    });

    const req = {
        email: email,
        nickname: nickname
    }

    await axios.post(`${BASE_URL}/users/profile/info`, req)
    .then(response => {
        
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}
