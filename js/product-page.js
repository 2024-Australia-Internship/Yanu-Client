// let first = 0;

// window.addEventListener('mousewheel',(event) => {
// 	let wheel = event.wheelDeltaX;
  
// 	// if(wheel > 0) {
//     //   console.log('Up!');
//     // }
// 	// else { // (wheel < 0)
//     //   console.log('Down!');
//     // }
// });

// window.addEventListener('wheel', (e) => { 
//     console.log(e.deltaY, e.deltaX);
//     window.scrollBy(0, 50);
// });
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

// 스크롤 이벤트 리스너 등록
document.addEventListener('wheel', handleScroll);

let currentIdx = 0; // 슬라이드 현재 번호
let translate = 0; // 슬라이드 위치 값

let sliderPageLength = document.getElementsByClassName('product-img-slider')[0].children.length;
let totalsliderWidth = document.getElementsByClassName('product-img-slider')[0];

if(sliderPageLength >= 2){
    for(var i = 1; i<=sliderPageLength; i++){
        const pages = document.createElement('input');
        pages.type = "radio";
        pages.name = "pageIndex";
        pages.style.border = 0;
        pages.className = `page-radio radio${i-1}`;
        if(i === 1) pages.checked = true;
        document.getElementsByClassName("product-img-cnt")[0].appendChild(pages);
    }
}

function nextSlide(){
    console.log('전으로 이동')
    if (currentIdx !== 0) {
        translate += totalsliderWidth.clientWidth;
        totalsliderWidth.style.transform = `translateX(${translate}px)`;
        currentIdx -= 1;
    }
    var currectPage = document.getElementsByClassName(`radio${currentIdx}`)[0];
    currectPage.checked = true;
}

function prevSilde(){
    console.log('다음으로 이동')
    if (currentIdx !== sliderPageLength -1) {
        translate -= totalsliderWidth.clientWidth;
        totalsliderWidth.style.transform = `translateX(${translate}px)`;
        currentIdx += 1;
    }
    var currectPage = document.getElementsByClassName(`radio${currentIdx}`)[0];
    currectPage.checked = true;
}
function chooseProductDetail(detail){
    let info = document.getElementsByClassName('product-info-div')[0];
    let review = document.getElementsByClassName('product-review-div')[0];

    let infoBtn = document.getElementsByClassName('product-info-btn')[0];
    let reivewBtn = document.getElementsByClassName('product-review-btn')[0];
    if(detail){ // product info
        info.style.display = 'inherit'
        review.style.display = 'none';

        infoBtn.classList.add('choose-detail');
        reivewBtn.classList.remove('choose-detail');
    }else{ //product review
        review.style.display = 'inherit'
        info.style.display = 'none';

        infoBtn.classList.remove('choose-detail');
        reivewBtn.classList.add('choose-detail');
    }
}