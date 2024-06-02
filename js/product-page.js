const urlParams = new URL(location.href).searchParams;
const product_code = urlParams.get('product_code');
const user_code = urlParams.get('user_code');
const farm_code = urlParams.get('farm_code');
const heartBtn = document.getElementsByClassName('heart-btn')[0];

window.onload = async() => {
  try{
    const response = await axios.get(`${BASE_URL}/products/product/${product_code}`, config);
    addRecentlyView();
    showInfo(response.data)
    // makeImages(response.data);
  }catch(error){
    console.log(error)
  }
}

function addRecentlyView() {
  let recentItem = JSON.parse(localStorage.getItem('recent'));
  if(recentItem){ // 값이 있을 경우
    // 최근 본 상품 가장 앞에 추가
    recentItem.unshift(product_code);

    // 최대 10개 까지 저장 가능
    let newRecentItem = [...new Set(recentItem)].slice(0, 10);

    // 값 저장
    localStorage.setItem('recent', JSON.stringify(newRecentItem));
  }else{ // 값이 없을 경우
    localStorage.setItem('recent', `["${product_code}"]`);
  }
}

async function addCart(){
  const req = {
    productId: {id: product_code}
  }

  try{
    const response = await axios.post(`${BASE_URL}/carts`, req, config);
    alert('A product has been added to your shopping cart.');
    window.location.href = './my-cart.html';
  }catch(error){
    console.error(error);
    if(error.response.status === 400){
      alert('This product has already been added.')
    }
  }
}

function showInfo(data){
  const { business_name, farmId, title, farm_name, hashtag, price, description } = data;

  let product_title = document.getElementsByClassName('product-name')[0];
  let product_price = document.getElementsByClassName('product-price')[0]
  let profile_img = document.getElementsByClassName('profile-img')[0];
  let farmer_name = document.getElementsByClassName('farmer-name')[0];
  let farmName = document.getElementsByClassName('farm-name')[0];
  let product_description = document.getElementsByClassName('product-description')[0];
  let product_hashtag = document.getElementsByClassName('product-hashtag')[0];

  product_title.innerText = title;
  product_price.innerText = `$ ${price}`
  farmer_name.innerText = farm_name;
  product_description.innerText = description;
  
  JSON.parse(hashtag).forEach(value => {
    let myHashtag = document.createElement('div');
    myHashtag.className = 'hashtag';
    myHashtag.innerText = `# ${value}`;
    product_hashtag.appendChild(myHashtag);
  })
}

heartBtn.onclick = () => clickFavorites(product_code, 'product', heartBtn);

let productImgSlider = document.getElementsByClassName('product-img-slider')[0];

function makeImages(images) {
  console.log(images);
  console.log(productImgSlider);
  for (let image of images) {
    let imgDiv = document.createElement('img');
    imgDiv.src = image;
    imgDiv.className = "product-title-img"

    productImgSlider.appendChild(imgDiv);
  }
  imgRadio();
}

// 스크롤 중 여부를 확인하기 위한 변수
let isScrolling = false;

// 페이지 이동 함수
function scrollToPage(direction) {
  if (!isScrolling) {
    isScrolling = true;
    if (direction === 'right') {
      prevSilde();
    } else if (direction === 'left') {
      nextSlide();
    }
    // 스크롤 이벤트 처리 후 500ms 동안 스크롤 중 상태 유지
    setTimeout(() => {
      isScrolling = false;
    }, 2000);
  }
}

// 스크롤 이벤트 핸들러
function handleScroll(event) {
  if (event.deltaX > 0) {
    // 오른쪽으로 스크롤
    scrollToPage('right');
  } else if (event.deltaX < 0) {
    // 왼쪽으로 스크롤
    scrollToPage('left');
  }
}
let currentIdx = 0; // 슬라이드 현재 번호
let translate = 0; // 슬라이드 위치 값
let slider = document.getElementsByClassName('product-img-div')[0];
function imgRadio() {
  let sliderPageLength = document.getElementsByClassName('product-img-slider')[0].children.length;
  if (sliderPageLength >= 2) {
    for (var i = 1; i <= sliderPageLength; i++) {
      const pages = document.createElement('input');
      pages.type = "radio";
      pages.name = "pageIndex";
      pages.style.border = 0;
      pages.className = `page-radio radio${i - 1}`;
      if (i === 1) pages.checked = true;
      document.getElementsByClassName("product-img-cnt")[0].appendChild(pages);
    }
  }
}
// 스크롤 이벤트 리스너 등록
slider.addEventListener('wheel', handleScroll);

function nextSlide() {
  let totalsliderWidth = document.getElementsByClassName('product-img-slider')[0];
  console.log('전으로 이동')
  if (currentIdx !== 0) {
    translate += totalsliderWidth.clientWidth;
    totalsliderWidth.style.transform = `translateX(${translate}px)`;
    currentIdx -= 1;
  }
  var currectPage = document.getElementsByClassName(`radio${currentIdx}`)[0];
  currectPage.checked = true;
}

function prevSilde() {
  let totalsliderWidth = document.getElementsByClassName('product-img-slider')[0];
  let sliderPageLength = document.getElementsByClassName('product-img-slider')[0].children.length;
  console.log('다음으로 이동')
  if (currentIdx !== sliderPageLength - 1) {
    translate -= totalsliderWidth.clientWidth;
    totalsliderWidth.style.transform = `translateX(${translate}px)`;
    currentIdx += 1;
  }
  var currectPage = document.getElementsByClassName(`radio${currentIdx}`)[0];
  currectPage.checked = true;
}
function chooseProductDetail(detail) {
  let info = document.getElementsByClassName('product-info-div')[0];
  let review = document.getElementsByClassName('product-review-div')[0];

  let infoBtn = document.getElementsByClassName('product-info-btn')[0];
  let reivewBtn = document.getElementsByClassName('product-review-btn')[0];
  if (detail) { // product info
    info.style.display = 'inherit'
    review.style.display = 'none';

    infoBtn.classList.add('choose-detail');
    reivewBtn.classList.remove('choose-detail');
  } else { //product review
    review.style.display = 'inherit'
    info.style.display = 'none';

    infoBtn.classList.remove('choose-detail');
    reivewBtn.classList.add('choose-detail');
  }
}

let bestReviewsDiv = document.getElementsByClassName('best-reviews')[0];
for (let i = 0; i < 20; i++) {
  let bestReview = document.createElement('div');
  bestReview.className = "best-review";

  let reviewerInfoDiv = document.createElement('div');
  reviewerInfoDiv.className = 'reviewer-info-div';

  let bestReviewerProfileImg = document.createElement('div');
  bestReviewerProfileImg.className = "best-reviewer-profile-img";
  bestReviewerProfileImg.innerHTML = `<img src="/images/product-img.png" class="reviewer-img">`

  let reviewer = document.createElement('div');
  reviewer.className = 'reviewer';

  let reviewerName = document.createElement('div');
  reviewerName.className = 'reviewer-name';
  reviewerName.innerText = 'Bella';

  let reviewerStarDiv = document.createElement('div');
  reviewerStarDiv.className = 'reviewer-star-div';

  for (let j = 0; j < 5; j++) {
    reviewerStarDiv.innerHTML += `<iconify-icon icon="ph:star-fill" class="review-star"></iconify-icon>`
  }

  reviewer.appendChild(reviewerName);
  reviewer.appendChild(reviewerStarDiv);

  reviewerInfoDiv.appendChild(bestReviewerProfileImg);
  reviewerInfoDiv.appendChild(reviewer);

  let reviewDetail = document.createElement('div');
  reviewDetail.className = 'review-detail';
  reviewDetail.innerText = `shdfshdfkjsdfhfjfjkshdkfhskhfkjhsdjfshdfsjkdfhuefhkjwhefksjhdfjkshfkjsdfjkdhfjksdhfkjsdfhjsfkjhfjkswhfkjsfwhkjwefkjwehfjkshkjfhskjfwhekfhwuefhkwhk`

  bestReview.appendChild(reviewerInfoDiv);
  bestReview.appendChild(reviewDetail);

  bestReviewsDiv.appendChild(bestReview);
}

let allReviews = document.getElementsByClassName('all-reviews')[0];
for (let i = 0; i < 20; i++) {
  let allReview = document.createElement('div');
  allReview.className = 'all-review'

  let reviewerTitleDiv = document.createElement('div');
  reviewerTitleDiv.className = 'reviewer-title-div';

  let reviewerInfoDiv = document.createElement('div');
  reviewerInfoDiv.className = 'reviewer-info-div';

  let allReviewerProfileImg = document.createElement('div');
  allReviewerProfileImg.className = 'all-reviewer-profile-img';
  allReviewerProfileImg.innerHTML = `<img src="/images/home-hover.svg" class="all-reviewer-img reviewer-img">`;

  let reviewerInfo = document.createElement('div');
  reviewerInfo.className = 'reviewer-info';

  let allReviewerName = document.createElement('div');
  allReviewerName.className = 'all-reviewer-name';
  allReviewerName.innerText = 'Amanda Scott'

  let reviewDate = document.createElement('div');
  reviewDate.className = 'review-date';
  reviewDate.innerText = '2024.01.12'

  reviewerInfo.appendChild(allReviewerName);
  reviewerInfo.appendChild(reviewDate);

  reviewerInfoDiv.appendChild(allReviewerProfileImg);
  reviewerInfoDiv.appendChild(reviewerInfo);

  let allReviewStars = document.createElement('div');
  allReviewStars.className = 'all-review-starts'
  for (let j = 0; j < 5; j++) {
    allReviewStars.innerHTML += `<iconify-icon icon="ph:star-fill" class="review-star all-review-star"></iconify-icon>`;
  }

  reviewerTitleDiv.appendChild(reviewerInfoDiv);
  reviewerTitleDiv.appendChild(allReviewStars);

  let allReviewDetail = document.createElement('div');
  allReviewDetail.className = 'all-review-detail';
  allReviewDetail.innerText = 'jsdfhlsdfhkdhfkhsdfdhsdhsdfhfkhsidwyhivbwifuwbklihfuwabyihfviawhribevhvfiuaebhlioanvihertaeurtnhaeilmvawiohaemloiwdjfvkd,uheuklfsndfjbklawvnhwuifbhlwaunvwi';

  allReview.appendChild(reviewerTitleDiv);
  allReview.appendChild(allReviewDetail);

  allReviews.appendChild(allReview);
}

function moveFarmerPage() {
  window.location.href = `/html/farmer-page.html?user_code=${user_code}&farm_code=${farm_code}`;
}