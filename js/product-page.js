let first = 0;

window.addEventListener('mousewheel',(event) => {
	let wheel = event.wheelDeltaX;
  
	// if(wheel > 0) {
    //   console.log('Up!');
    // }
	// else { // (wheel < 0)
    //   console.log('Down!');
    // }
});

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