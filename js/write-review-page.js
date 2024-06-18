const urlParams = new URL(location.href).searchParams;
const product_id = urlParams.get('product_id');
const order_id = urlParams.get('order_id');

const starArr = [...document.getElementsByClassName('star')];

window.onload = () => {
    starArr.forEach((value, index) => {
        value.addEventListener('click', () => starRating(index));
    });
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
              createElement(e, file);
            };
            reader.readAsDataURL(file);
        }
    })

}

function createElement(e, file){
    let uploadImgDiv = document.getElementsByClassName('upload-img-div')[0];
    
    let uploadImgLi = document.createElement('div');
    uploadImgLi.classList.add('upload-img');
    uploadImgLi.classList.add('upload-img-li');
    uploadImgLi.innerHTML += `<iconify-icon icon="mynaui:x" class="delete-img" onclick="deleteImg(this)"></iconify-icon>`
    uploadImgLi.style.backgroundImage = `url(${e.target.result})`

    uploadImgDiv.appendChild(uploadImgLi);
    let images = [...document.getElementsByClassName('upload-img-li')].length;
    currentImgLength.innerText = images;
}

function deleteImg(e){
    e.parentNode.remove();
    currentImgLength.innerText = parseInt(currentImgLength.innerText)-1;
}

async function postReview(){
    let files = document.getElementsByClassName('upload-file')[0].files;
    let starrating = document.getElementsByClassName('fill-star').length;
    let content = document.getElementsByClassName('evaluation-box')[0].value;

    try{   
        if(files.length === 0) {
            return alert('Please upload an image.')
        }

        if(starrating === 0) {
            return alert('Please enter a rating.')
        }

        if(content === ''){
            return alert('Please enter a content.')
        }

        const req = {
            productId: {id: product_id},
            starrating: starrating,
            content: content,
            orderId: {id: order_id}
        }

        const response = await axios.post(`${BASE_URL}/reviews`, req, config)
        uploadReviewImg(response.data)
    }catch(error){
        console.error(error)
        if(error.response.status === 400) {
            window.location.href='./order-history-page.html'
            return alert('You have already registered a review')
        }
    }
    
}

async function uploadReviewImg(reviewId) {
    try{
        const formData = new FormData();
        let files = document.getElementsByClassName('upload-file')[0].files;
        console.log([...files]);

        for(let file of files){
            formData.append('image', file);
        }

        formData.append('review_id', reviewId);

        let response = await axios.post(`${BASE_URL}/reviews/images`, formData, config);
        console.log(response);

        window.location.href='./my-review-page.html'
    }catch(err){
        console.error(err);
    }
} 