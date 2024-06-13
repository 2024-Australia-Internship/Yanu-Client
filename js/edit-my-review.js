const urlParams = new URL(location.href).searchParams;
const product_id = urlParams.get('product_id');
const review_id = urlParams.get('review_id');
let recentImages = [];

const starArr = [...document.getElementsByClassName('star')];

window.onload = () => {
    starArr.forEach((value, index) => {
        value.addEventListener('click', () => starRating(index));
    });
    getMyReview()
}

async function getMyReview(){
    try{
        const response = await axios.get(`${BASE_URL}/reviews/8`, config);
        
        console.log()
        editInfo(response.data)
    }catch(err){
        console.error(err);
    }
}

function setReview(){
    try{
        let starrating = document.getElementsByClassName('fill-star').length;
        let content = document.getElementsByClassName('evaluation-box')[0].value;
        let images = [...document.getElementsByClassName('image')];
        let files = document.getElementsByClassName('upload-file')[0].files;
        let removeImage = [...recentImages];

        if(starrating === 0) {
            return alert('Please enter a rating')
        }
    
        if(content === ''){
            return alert('Please enter a content')
        }

        let formData = new FormData();

        // 지운 사진 조회
        images.forEach(image => {
            if(removeImage.includes(image)){
                removeImage.splice(removeImage.indexOf(image), 1);
            } 
        })
        formData.append('removeImage', removeImage.join(', '))

        // 새로 업로드한 파일 추가
        for(let file of files){
            formData.append('image', file);
        }

        formData.append('starrating', starrating)
        formData.append('content', content)
    }catch(err){
        console.error(err);
    }
}

function editInfo(review){
    console.log(review);
    let descriptionBox = document.getElementsByClassName('evaluation-box')[0]
    descriptionBox.value = review.content;

    starArr[review.starrating - 1].click();

    let images = review.images.map(img => `${IMAGE_URL}${img}`);
    recentImages = [...images];
    images.forEach(image => {
        createElement(image);
    })
}

function starRating(index){
    for(let star of starArr){
        star.classList.remove('fill-star');
    }
    for(let i=0; i<=index; i++){
        starArr[i].classList.add('fill-star');
    }
}

let imgUploadBtn = document.getElementsByClassName('upload-img-btn')[0];
let realImgUploadBtn = document.getElementsByClassName('upload-file')[0];
let currentImgLength = document.getElementsByClassName('current-img')[0];

realImgUploadBtn.addEventListener('change', getImageFiles);

imgUploadBtn.addEventListener('click', () => realImgUploadBtn.click());

function getImageFiles(e) {
    let images = [...document.getElementsByClassName('upload-img-li')].length;
    const files = e.currentTarget.files;
  
    if ([...files].length >= 6 || [...files].length + images >= 6) {
      alert('Up to 5 images can be uploaded.');
      return;
    }

    [...files].forEach(file => {
        if (!file.type.match("image/.*")) {
          alert('Only image files can be uploaded.');
          return;
        }
        if ([...files].length < 6 && [...files].length + images < 6) {
            const reader = new FileReader();
            reader.onload = (e) => {
              createElement(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    })

}

function createElement(image){
    let uploadImgDiv = document.getElementsByClassName('upload-img-div')[0];
    
    let uploadImgLi = document.createElement('div');
    uploadImgLi.classList.add('upload-img');
    uploadImgLi.classList.add('upload-img-li');
    uploadImgLi.innerHTML += `<iconify-icon icon="mynaui:x" class="delete-img" onclick="deleteImg(this)"></iconify-icon>`
    
    let newimage = document.createElement('img');
    newimage.className = 'image';
    newimage.src = image;

    uploadImgLi.appendChild(newimage);

    uploadImgDiv.appendChild(uploadImgLi);
    let images = [...document.getElementsByClassName('upload-img-li')].length;
    currentImgLength.innerText = images;
}

function deleteImg(e){
    e.parentNode.remove();
    currentImgLength.innerText = parseInt(currentImgLength.innerText)-1;
}