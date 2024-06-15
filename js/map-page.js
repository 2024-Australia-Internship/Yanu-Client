const listMap = document.getElementsByClassName('list-map')[0];
const mapConfig = {
	headers: {
		'Content-type': 'application/json;charset=UTF-8',
		'Authorization': `KakaoAK a30996029d69ea4129413adcbd4e0ff5`
	}
}

window.onload = () => {
	kakao.maps.load(() => {
		showMap();
	})
	
}

let x1;
let y1;

async function showMap(){
	const markerX = 37.4668;
	const markerY = 126.9326;

	const mapContainer = document.getElementById('map');
	const mapOption = {
		center: new kakao.maps.LatLng(37.4668, 126.9326),
		level: 3
	};

	// 지도 생성
	const map = new kakao.maps.Map(mapContainer, mapOption);
				
	var imageSrc = '../images/marker.svg', // 마커이미지의 주소입니다    
		imageSize = new kakao.maps.Size(127, 127), // 마커이미지의 크기입니다
		imageOption = {offset: new kakao.maps.Point(63, 63)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

	var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
		markerPosition = new kakao.maps.LatLng(markerX, markerY);

	// 마커를 생성
	var marker = new kakao.maps.Marker({
		position: markerPosition, 
		image: markerImage // 마커이미지 설정 
	});

	// 마커가 지도 위에 표시되도록 설정
	marker.setMap(map);

	getFarms(markerX, markerY, map);
}

async function getFarms(markerX, markerY, map){
	const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/transcoord?x=${markerX}&y=${markerY}&output_coord=WTM`, mapConfig);

	x1 = response.data.documents[0].x;
	y1 = response.data.documents[0].y;

	const farms = await axios.get(`${BASE_URL}/farms/lists`, config);
	
	showOverlay(x1, y1, map, farms.data);
	fetchListFormat(x1, y1, farms.data);
}

async function fetchListFormat(x1, y1, farms) {
	const farmList = [];
	console.log(x1, y1);
	console.log(farms)

    for (const farm of farms) {
        const x = farm.latitude;
        const y = farm.longitude;

        const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/transcoord?x=${x}&y=${y}&output_coord=WTM`, mapConfig);

        const x2 = response.data.documents[0].x;
        const y2 = response.data.documents[0].y;

        const myDistance = getDistance(x1, y1, x2, y2);
        console.log(myDistance);

        farm.distance = myDistance;
        farmList.push(farm);
    }

    // 거리순으로 정렬
	farmList.sort((a, b) => a.distance - b.distance)
	showFarmList(farmList);
}

async function showOverlay(x1, y1, map, farms){
	farms.forEach(async(position, index) => {
		try{
			const x = position.latitude;
			const y = position.longitude;

			const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/transcoord?x=${x}&y=${y}&output_coord=WTM`, mapConfig);

			const x2 = response.data.documents[0].x;
			const y2 = response.data.documents[0].y;

			const myDistance = getDistance(x1, y1, x2, y2);
			console.log(myDistance)

			let box = document.createElement('div');
			box.className = 'overlay-box'

			let content = document.createElement('div');
			content.className = "overlay";

			let farmName = document.createElement('div');
			farmName.className = 'overlay-farm-name'
			farmName.innerText = position.businessName;

			let farmInfo = document.createElement('div');
			farmInfo.className = 'overlay-farm-info';

			let starBox = document.createElement('div');
			starBox.className = 'overlay-star-box';

			let starIcon = document.createElement('iconify-icon');
			starIcon.className = 'overlay-star-icon';
			starIcon.icon = 'ph:star-fill';

			let starRating = document.createElement('div');
			starRating.className = 'overlay-star-rating';
			starRating.innerText = (position.averageStarRating).toFixed(1);

			starBox.appendChild(starIcon);
			starBox.appendChild(starRating);

			let distance = document.createElement('div');
			distance.className = 'overlay-distance';
			distance.innerText = `${myDistance}m`;

			farmInfo.appendChild(starBox);
			farmInfo.appendChild(distance);

			content.appendChild(farmName)
			content.appendChild(farmInfo)

			let subContent = document.createElement('div');
			subContent.className = 'sub-overlay';
			subContent.classList.add('sub-overlay');
			subContent.classList.add('hide-overlay');

			let farmTitle = document.createElement('div');
			farmTitle.className = 'overlay-farm-title';

			let div = document.createElement('div');

			let subFarmName = document.createElement('div');
			subFarmName.className = 'overlay-farm-name';
			subFarmName.innerText = position.businessName;

			let subFarmInfo = document.createElement('div');
			subFarmInfo.className = 'overlay-sub-farm-info'

			let subStarBox = document.createElement('star-box');
			subStarBox.className = 'overlay-star-box';

			let subStarIcon = document.createElement('iconify-icon');
			subStarIcon.className = 'overlay-star-icon'
			subStarIcon.icon = 'ph:star-fill';

			let subStarRating = document.createElement('div');
			subStarRating.className = 'overlay-star-rating';
			subStarRating.innerText = (position.averageStarRating).toFixed(1);

			subStarBox.appendChild(subStarIcon);
			subStarBox.appendChild(subStarRating);

			let subDistance = document.createElement('div');
			subDistance.className = 'overlay-distance';
			subDistance.innerText = `${myDistance}m`;

			subFarmInfo.appendChild(subStarBox);
			subFarmInfo.appendChild(subDistance);

			div.appendChild(subFarmName);
			div.appendChild(subFarmInfo);

			let arrowIcon = document.createElement('iconify-icon');
			arrowIcon.className = 'arrow-icon';
			arrowIcon.icon = 'iconamoon:arrow-up-2-thin';

			farmTitle.appendChild(div)
			farmTitle.appendChild(arrowIcon)

			let farmImgBox = document.createElement('div');
			farmImgBox.className = 'overlay-farm-img-box';

			let farmImg = document.createElement('img');
			farmImg.className = 'overlay-farm-img';
			farmImg.src = position.profile === null ? '../images/farmer-registration-back-img.svg' : `${IMAGE_URL}${position.profile}`
			console.log( `${IMAGE_URL}${position.profile}`)
			farmImgBox.appendChild(farmImg);

			subContent.appendChild(farmTitle)
			subContent.appendChild(farmImgBox)

			box.appendChild(subContent);
			box.appendChild(content);

			console.log(position);
			arrowIcon.onclick = () => {
				window.location.href = `/html/farmer-page.html?user_code=${position.userId}&farm_code=${position.farmId}`
			}

			// 커스텀 오버레이 생성
			var customOverlay  = new kakao.maps.CustomOverlay({
				position: new kakao.maps.LatLng(position.latitude, position.longitude),
				content: box,
				xAnchor: 0.5,
				yAnchor: 0.20
			});
			
			customOverlay.setMap(map);
			
			content.onclick = () => {
				subContent.classList.toggle('hide-overlay')
			}
		}catch(error){
			console.error(error);
		}
	})
}

const inputMap = document.getElementsByClassName('input-map')[0];
const inputList = document.getElementsByClassName('input-list')[0];

inputMap.onkeydown = e => {
	if(e.keyCode === 13){
		findFarm('input-map')
	}
}

inputList.onkeydown = e => {
	if(e.keyCode === 13){
		findFarm('input-list')
	}
}

async function findFarm(input){
	let farm = document.getElementsByClassName(input)[0].value;
	console.log(listMap.classList.contains('hide-list'))

	if(listMap.classList.contains('hide-list')){ // list가 아래로 내려가있을때
		listMap.classList.remove('hide-list')
		let inputList = document.getElementsByClassName('input-list')[0];
		inputList.value = farm;
	}

	try{
		if(!farm){ // 빈 문자일 때 
			const response = await axios.get(`${BASE_URL}/farms/lists`, config);
			fetchListFormat(x1, y1, response.data)
		}else{
			const response = await axios.get(`${BASE_URL}/searches/farms/${farm}`, config);
			console.log(response.data);
			fetchListFormat(x1, y1, response.data)
		}
	}catch(err){
		console.error(err);
	}
	
}


function showList() {
	listMap.classList.toggle('hide-list')
}

function getDistance(x1, y1, x2, y2) {
	return Math.round(Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2));
}

function showFarmList(farms) {
	const farmList = document.getElementsByClassName('farm-list')[0];
	farmList.innerHTML = ''

	farms.forEach(farm => {
		console.log(farm)
		let farmBox = document.createElement('div');
		farmBox.className = 'farm-box';

		let farmImgBox = document.createElement('div');
		farmImgBox.className = 'farm-img-box';

		let farmImg = document.createElement('img');
		farmImg.className = 'farm-img';
		farmImg.src = farm.farmImage ? `${IMAGE_URL}${farm.farmImage}`: '../images/farmer-registration-back-img.svg';

		let heart = document.createElement('iconify-icon');
		heart.className = 'heart';
		heart.icon = farm.checkIsHeart ? 'ph:heart-fill' : 'ph:heart';

		farmImgBox.appendChild(farmImg)
		farmImgBox.appendChild(heart)

		let farmTitle = document.createElement('div');
		farmTitle.className = 'farm-title';

		let farmName = document.createElement('div');
		farmName.className = 'farm-name';
		farmName.innerText = farm.businessName

		let starRating = document.createElement('div');
		starRating.className = 'star-rating';
		
		let starIcon = document.createElement('iconify-icon');
		starIcon.className = 'star-icon';
		starIcon.icon = 'ph:star-fill';

		let star = document.createElement('div');
		star.className = 'star';
		star.innerText = (farm.averageStarRating).toFixed(1);

		starRating.appendChild(starIcon)
		starRating.appendChild(star)

		farmTitle.appendChild(farmName)
		farmTitle.appendChild(starRating)

		let farmerName = document.createElement('div');
		farmerName.className = 'farmer-name';
		farmerName.innerText = farm.farmName;

		let farmInfo = document.createElement('div');
		farmInfo.className = 'farm-info';
		
		let distance = document.createElement('div');
		distance.className = 'distance';
		distance.innerText = `${farm.distance}m`;
		
		let products = document.createElement('div');
		products.className = 'products'
		products.innerText = `${farm.products.length} products`;

		let reviews = document.createElement('div');
		reviews.className = 'reviews';
		reviews.innerText = `${farm.reviews.length} reviews`;

		farmInfo.appendChild(distance)
		farmInfo.appendChild(products)
		farmInfo.appendChild(reviews)

		farmBox.appendChild(farmImgBox)
		farmBox.appendChild(farmTitle)
		farmBox.appendChild(farmerName)
		farmBox.appendChild(farmInfo)

		farmList.appendChild(farmBox);

		heart.onclick = () => clickFavorites(farm.farmId, 'farmId', 'farms', heart)
		farmImg.onclick = () => moveFarmPage(farm.farmId, farm.userId);
	})
}

function moveFarmPage(farm_code, user_code){
	window.location.href = `/html/farmer-page.html?user_code=${user_code}&farm_code=${farm_code}`;
}

