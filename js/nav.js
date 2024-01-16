let choosePage = document.getElementById('choose-page');
let choosePageName = choosePage.firstElementChild.classList[1];
console.log(choosePage.firstElementChild.innerHTML);
choosePage.firstElementChild.innerHTML = `<img src="/images/${choosePageName}-hover.svg">`;