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
        const response = await axios.get(`${BASE_URL}/reviews/${review_id}`, config);
        editInfo(response.data)
    }catch(err){
        console.error(err);
    }
}

async function setReview(){
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
            if(removeImage.includes(image.url)){
                removeImage.splice(removeImage.indexOf(image.url), 1);
            } 
        })
        formData.append('removeImage', removeImage.join(', '))

        // 새로 업로드한 파일 추가
        for(let file of files){
            formData.append('image', file);
        }

        // 새 이미지를 업로드하지 않은 경우
        if(files.length === 0){
            formData.append('image', null);
        }

        formData.append('starrating', starrating)
        formData.append('content', content)

        const response = await axios.put(`${BASE_URL}/reviews/${product_id}`, formData, config);
        console.log(response);
        window.location.href = '/html/my-review-page.html'
    }catch(err){
        console.error(err);
    }
}

function editInfo(review){
    console.log(review);
    let descriptionBox = document.getElementsByClassName('evaluation-box')[0]
    descriptionBox.value = review.content;

    starArr[review.starrating - 1].click();

    recentImages = [...review.images];
    review.images.forEach(image => {
        createElement(image, true);
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
      alert('You can upload up to 5 items.');
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
              createElement(e.target.result, false);
            };
            reader.readAsDataURL(file);
        }
    })

}

function createElement(image, isPrev){
    let uploadImgDiv = document.getElementsByClassName('upload-img-div')[0];
    
    let uploadImgLi = document.createElement('div');
    uploadImgLi.classList.add('upload-img');
    uploadImgLi.classList.add('upload-img-li');
    uploadImgLi.innerHTML += `<iconify-icon icon="mynaui:x" class="delete-img" onclick="deleteImg(this)"></iconify-icon>`
    
    let newimage = document.createElement('img');
    newimage.className = 'image';
    if(isPrev){
        newimage.src = `${IMAGE_URL}${image}`;
    }else{
        newimage.src = image
    }
    newimage.url = image;

    uploadImgLi.appendChild(newimage);

    uploadImgDiv.appendChild(uploadImgLi);
    let images = [...document.getElementsByClassName('upload-img-li')].length;
    currentImgLength.innerText = images;
}

function deleteImg(e){
    e.parentNode.remove();
    currentImgLength.innerText = parseInt(currentImgLength.innerText)-1;
}