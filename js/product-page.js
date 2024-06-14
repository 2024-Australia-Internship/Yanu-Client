const urlParams = new URL(location.href).searchParams;
const product_code = urlParams.get('product_code');
const user_code = urlParams.get('user_code');
const farm_code = urlParams.get('farm_code');
const heartBtn = document.getElementsByClassName('heart-btn')[0];

window.onload = async() => {
  let addCartBtn = document.getElementsByClassName('add-cart-btn')[0];
  let buyBtn = document.getElementsByClassName('buy-btn')[0];
  try{
    const response = await axios.get(`${BASE_URL}/products/product/${product_code}`, config);
    addRecentlyView(); // 최근 본 상품에 추가
    showInfo(response.data) // 상품 정보

    const reviewRes = await axios.get(`${BASE_URL}/reviews/product/${product_code}`, config);
    showBestReview(reviewRes.data); // 베스트 리뷰
    showReviews(reviewRes.data); // 모든 리뷰

    // 내가 올린 상품인지 비교
    let id = JSON.parse(getCookie('userdata')).id; 

    if(id == user_code){
      addCartBtn.style.display = 'none'
      buyBtn.classList.add('prevent-buy')
    }else{
      buyBtn.onclick = () => orderProduct()
    }

  }catch(error){
    console.log(error)
  }
}

function showBestReview(reviews){
  let bestReviewsDiv = document.getElementsByClassName('best-reviews')[0];
  
  const limit = reviews.length < 5 ? reviews.length : 5;
  
  for (let i = 0; i < limit; i++) {
    console.log(reviews[i]);
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
    reviewerName.innerText = reviews[i].writerName;
  
    let reviewerStarDiv = document.createElement('div');
    reviewerStarDiv.className = 'reviewer-star-div';
  
    reviewerStarDiv.innerHTML += `<iconify-icon icon="ph:star-fill" class="review-star"></iconify-icon>`.repeat(reviews[i].starrating)
  
    reviewer.appendChild(reviewerName);
    reviewer.appendChild(reviewerStarDiv);
  
    reviewerInfoDiv.appendChild(bestReviewerProfileImg);
    reviewerInfoDiv.appendChild(reviewer);
  
    let reviewDetail = document.createElement('div');
    reviewDetail.className = 'review-detail';
    reviewDetail.innerText = reviews[i].content
  
    bestReview.appendChild(reviewerInfoDiv);
    bestReview.appendChild(reviewDetail);
  
    bestReviewsDiv.appendChild(bestReview);
  }
}

function showReviews(reviews){
  let allReviews = document.getElementsByClassName('all-reviews')[0];
  let starAvgBox = document.getElementsByClassName('avg-num')[0];
  let starAvg = 0;
  
  reviews.forEach(review => {
    console.log(review);
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
    allReviewerName.innerText = review.writerName
  
    let reviewDate = document.createElement('div');
    reviewDate.className = 'review-date';
    reviewDate.innerText = review.createdAt.replaceAll('-', '.');
  
    reviewerInfo.appendChild(allReviewerName);
    reviewerInfo.appendChild(reviewDate);
  
    reviewerInfoDiv.appendChild(allReviewerProfileImg);
    reviewerInfoDiv.appendChild(reviewerInfo);
  
    let allReviewStars = document.createElement('div');
    allReviewStars.className = 'all-review-starts'
    allReviewStars.innerHTML += `<iconify-icon icon="ph:star-fill" class="review-star all-review-star"></iconify-icon>`.repeat(review.starrating);
  
    reviewerTitleDiv.appendChild(reviewerInfoDiv);
    reviewerTitleDiv.appendChild(allReviewStars);
  
    let allReviewDetail = document.createElement('div');
    allReviewDetail.className = 'all-review-detail';
    allReviewDetail.innerText = review.content;
  
    allReview.appendChild(reviewerTitleDiv);
    allReview.appendChild(allReviewDetail);
  
    allReviews.appendChild(allReview);

    starAvg += review.starrating;
  })

  if(reviews.length === 0) { // 리뷰가 없을 때
    starAvgBox.innerText = starAvg
  }else{ // 리뷰가 있을 때
    starAvgBox.innerText = (starAvg / reviews.length).toFixed(1);
  }
}

function addRecentlyView() {
  let recentItem = localStorage.getItem('recent');
  if(recentItem){ // 값이 있을 경우
    // 최근 본 상품 가장 앞에 추가
    recentItem = JSON.parse(recentItem);
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
    if(confirm('The product has been added to your shopping cart. Would you like to go to cart?')){
      window.location.href = './my-cart.html';
    }
  }catch(error){
    console.error(error);
    if(error.response.status === 400){
      alert('This product has already been added.')
    }
  }
}

function orderProduct() {
  let arr = {
      productId: product_code,
      quantity: 1
  }

  const stringArr = JSON.stringify(arr);

  window.location.href = `./purchase-page.html?product_info=${stringArr}`
}

function showInfo(data){
  const { productId, business_name, title, farm_name, hashtag, price, description, heart, images } = data;

  let product_title = document.getElementsByClassName('product-name')[0];
  let product_price = document.getElementsByClassName('product-price')[0]
  let profile_img = document.getElementsByClassName('profile-img')[0];
  let farmer_name = document.getElementsByClassName('farmer-name')[0];
  let farmName = document.getElementsByClassName('farm-name')[0];
  let product_description = document.getElementsByClassName('product-description')[0];
  let product_hashtag = document.getElementsByClassName('product-hashtag')[0];
  let heartBtn = document.getElementsByClassName('heart-btn')[0];

  heartBtn.icon = heart ? "ph:heart-fill" : "ph:heart";
  heartBtn.onclick = () => clickFavorites(productId, 'productId', 'products', heartBtn)

  product_title.innerText = title;
  product_price.innerText = `$ ${price}`
  farmer_name.innerText = farm_name;
  farmName.innerText = business_name;
  product_description.innerText = description;
  
  JSON.parse(hashtag).forEach(value => {
    let myHashtag = document.createElement('div');
    myHashtag.className = 'hashtag';
    myHashtag.innerText = `# ${value}`;
    product_hashtag.appendChild(myHashtag);
  })

  makeImages(images)
}

heartBtn.onclick = () => clickFavorites(product_code, 'product', heartBtn);

let productImgSlider = document.getElementsByClassName('product-img-slider')[0];

function makeImages(images) {
  console.log(images);
  console.log(productImgSlider);
  for (let image of images) {
    let imgDiv = document.createElement('img');
    imgDiv.src = `${IMAGE_URL}${image}`;
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
    }, 1900);
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

function moveFarmerPage() {
  window.location.href = `/html/farmer-page.html?user_code=${user_code}&farm_code=${farm_code}`;
}