let index = -1;
let editBtns = [...document.getElementsByClassName('edit-btn')];
editBtns.forEach((e, i) => {
    e.onclick = () => showEditDiv(e, i);
})

let productBox = [...document.getElementsByClassName('product-name')];
productBox.forEach((e, i) => {
    e.onclick = () => showProduct(e, i);
})

document.addEventListener('click', (e) => {
    let editDiv = document.getElementsByClassName('edit-post-div')[0];
    if(e.target.className != "edit-btn"){
        editDiv.style.visibility = "hidden";
    }

});

window.onload = () => {
    getReview();
}

async function getReview() {
    try{
        // const response = await axios.get(`${BASE_URL}/reviews`, config);
        // console.log(response);

        const response = [
            {
                "userId": 2,
                "productId": 8,
                "starrating": 5,
                "content": "좋은데... 뭔가 아쉬워요 씁하",
                "createdAt": "2024-06-02"
            },
            {
                "userId": 2,
                "productId": 8,
                "starrating": 1,
                "content": "좋은데... 뭔가 아쉬워요 씁하",
                "createdAt": "2024-06-02"
            },
            {
                "userId": 2,
                "productId": 8,
                "starrating": 2,
                "content": "좋은데... 뭔가 아쉬워요 씁하",
                "createdAt": "2024-06-03"
            },
            {
                "userId": 2,
                "productId": 8,
                "starrating": 3,
                "content": "좋은데... 뭔가 아쉬워요 씁하",
                "createdAt": "2024-06-03"
            }
        ]

        let reviewHistory = {};
        response.forEach(history => {
            if(reviewHistory[history.createdAt]) {
                reviewHistory[history.createdAt].push(history);
            }else{
                reviewHistory[history.createdAt] = [history];
            }
        })

        showReviews(reviewHistory);
    }catch(error){
        console.error(error);
    }
}

function showReviews(reviewHistory) {
    const keys = Object.keys(reviewHistory);
    const myReviewHistory = document.getElementsByClassName('my-review-list')[0];

    keys.forEach(key => {
        let value = reviewHistory[key];

        let currentDateReview = document.createElement('div');
        currentDateReview.className = 'current-date-review';

        let reviewTitle = document.createElement('div');
        reviewTitle.className = 'review-title';
        reviewTitle.innerText = key.replaceAll('-', '.');

        let currentDateReviewList = document.createElement('div');
        currentDateReviewList.className = 'current-date-review-list';

        currentDateReview.appendChild(reviewTitle);
        currentDateReview.appendChild(currentDateReviewList);

        myReviewHistory.appendChild(currentDateReview)

        value.forEach(product => {
            let reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';

            let reviewStarEditBox = document.createElement('div');
            reviewStarEditBox.className = 'review-star-edit-box';

            let starRating = document.createElement('div');
            starRating.className = 'star-rating';
            starRating.innerHTML = `${'<iconify-icon icon="ph:star-fill" class="star"></iconify-icon>'.repeat(product.starrating)}`
        
            let editBtn = document.createElement('iconify-icon');
            editBtn.className = 'edit-btn'
            editBtn.icon = 'quill:meatballs-h'

            reviewStarEditBox.appendChild(starRating)
            reviewStarEditBox.appendChild(editBtn)

            let productName = document.createElement('div');
            productName.className = 'product-name';

            let div = document.createElement('div');
            div.innerText = '[Annie] SWEET SWEET strawberries 🍓 sdhfk sdfhjshfhdf hsdfkhsjkdfhshdf sdhfkjh'

            let productBtn = document.createElement('iconify-icon');
            productBtn.className = 'product-btn';
            productBtn.icon = 'iconamoon:arrow-up-2-thin';

            productName.appendChild(div)
            productName.appendChild(productBtn)

            let myReview = document.createElement('div');
            myReview.className = 'my-review';

            let reviewImg = document.createElement('img');
            reviewImg.className = 'review-img';
            reviewImg.src = '/images/product-img.png'

            let review = document.createElement('div');
            review.className ='review'
            review.innerText = 'These strawberries are really GOOOOOOOD!! I have two sons and my sons love these strawberries...'
        
            myReview.appendChild(reviewImg)
            myReview.appendChild(review)

            reviewCard.appendChild(reviewStarEditBox)
            reviewCard.appendChild(productName)
            reviewCard.appendChild(myReview)

            currentDateReviewList.appendChild(reviewCard)
        })
    })
}

function showProduct(e, i){
    window.location.href = '../html/product-page.html';
}

function showEditDiv(e, i){
    console.log(e, i);
    let editDiv = document.getElementsByClassName('edit-post-div')[0];
    if(index != i){
        let buttonRect = e.getBoundingClientRect();
        let buttonX = buttonRect.left + window.pageXOffset;
        let buttonY = buttonRect.top + window.pageYOffset;
        editDiv.style.visibility = "visible";
        editDiv.style.top = `${buttonY + 24}px`;
        editDiv.style.left =`${buttonX - 70}px`;
        index = i;
    }else{
        editDiv.style.visibility = "hidden";
        index = -1;
    }

    let editButton = document.getElementsByClassName('edit-post')[0];
    let deleteButton = document.getElementsByClassName('delete-post')[0];
    editButton.onclick = () => editMyPost(i);
    deleteButton.onclick = () => deleteMyPost(i);
}

function editMyPost(i){
    window.location.href = '../html/edit-my-review.html';
    
}
function deleteMyPost(i){

}